package com.backgroundstepcounter.services
import android.hardware.Sensor
import android.hardware.SensorManager
import android.util.Log
import com.backgroundstepcounter.BackgroundStepCounterModule
import com.backgroundstepcounter.utils.SensorFusionMath.dot
import com.backgroundstepcounter.utils.SensorFusionMath.norm
import com.backgroundstepcounter.utils.SensorFusionMath.normalize
import com.backgroundstepcounter.utils.SensorFusionMath.sum
import kotlin.math.min


class AccelerometerService(
        counterModule: BackgroundStepCounterModule,
        sensorManager: SensorManager
) : SensorListenService(counterModule, sensorManager) {
    override val sensorTypeString = "Accelerometer"
    override val sensorType = Sensor.TYPE_ACCELEROMETER
    override val detectedSensor: Sensor? = sensorManager?.getDefaultSensor(sensorType)
    override var currentSteps: Double = 0.0
    private var velocityRingCounter: Int = 0
    private var accelRingCounter: Int = 0
    private var oldVelocityEstimate: Float = 0f
    private var lastStepTimeNs: Long = 0

    // We want to keep a history of values to do a rolling average of the current
    private val accelRingX = FloatArray(ACCEL_RING_SIZE)
    private val accelRingY = FloatArray(ACCEL_RING_SIZE)
    private val accelRingZ = FloatArray(ACCEL_RING_SIZE)

    // We want to keep a history of values to do a rolling average of the current
    private val velocityRing = FloatArray(VELOCITY_RING_SIZE)

    override fun updateCurrentSteps(eventData: FloatArray): Boolean {
        val timeNs = System.nanoTime()
        // First step is to update our guess of where the global z vector is.
        accelRingCounter++
        // We keep a rolling average of the last 50 values
        accelRingX[accelRingCounter % ACCEL_RING_SIZE] = eventData[0]
        accelRingY[accelRingCounter % ACCEL_RING_SIZE] = eventData[1]
        accelRingZ[accelRingCounter % ACCEL_RING_SIZE] = eventData[2]
        // Next we'll calculate the average of the last 50 vectors in the ring
        val gravity: FloatArray = floatArrayOf(
                sum(accelRingX) / min(accelRingCounter, ACCEL_RING_SIZE),
                sum(accelRingY) / min(accelRingCounter, ACCEL_RING_SIZE),
                sum(accelRingZ) / min(accelRingCounter, ACCEL_RING_SIZE)
        )
        // Next step is to figure out the component of the current acceleration
        // in the direction of world_z and subtract gravity's contribution
        val currentZ: Float = dot(normalize(gravity), eventData) - norm(gravity)
        // Now we just need to update our estimate of the velocity
        velocityRingCounter++
        // We keep a rolling average of the last 10 values
        velocityRing[velocityRingCounter % VELOCITY_RING_SIZE] = currentZ
        // Calculate the average of the last 10 values
        val velocityEstimate: Float = sum(velocityRing)
        // If the velocity estimate is greater than the threshold and the previous
        val isWalkingOrRunning: Boolean =
                velocityEstimate > STEP_THRESHOLD &&
                        oldVelocityEstimate <= STEP_THRESHOLD &&
                        timeNs - lastStepTimeNs > STEP_DELAY_NS
        if (isWalkingOrRunning) {
            currentSteps = currentSteps.plus(1)
            Log.d(TAG_NAME, "STATUS: $currentSteps steps. TIMESTAMP: $timeNs")
            lastStepTimeNs = timeNs
        }
        oldVelocityEstimate = velocityEstimate
        return isWalkingOrRunning
    }

    companion object {
        /**
         * The delay between steps in nanoseconds
         */
        private const val STEP_DELAY_NS = 300000000 // 300ms

        /**
         * The size of the acceleration sensor data ring
         */
        private const val ACCEL_RING_SIZE = 60

        /**
         * The size of the acceleration's velocity ring
         */
        private const val VELOCITY_RING_SIZE = 15

        /**
         * The minimum acceleration that is considered a step
         */
        private const val STEP_THRESHOLD = 16f // 4f-16f

        val TAG_NAME: String = AccelerometerService::class.java.name
    }
}
