package com.backgroundstepcounter.services
import android.hardware.Sensor
import android.hardware.SensorManager
import com.backgroundstepcounter.BackgroundStepCounterModule
import java.util.concurrent.TimeUnit


class StepCounterService(
        counterModule: BackgroundStepCounterModule,
        sensorManager: SensorManager
) : SensorListenService(counterModule, sensorManager) {
    override val sensorTypeString = "Step Counter"
    override val sensorType = Sensor.TYPE_STEP_COUNTER
    override val detectedSensor: Sensor? = sensorManager?.getDefaultSensor(sensorType)
    private var previousSteps: Double = 0.0
        set(value) {
            if (field < value) {
                field = value
            }
        }
    override var currentSteps: Double = 0.0
        set(value) {
            if (field < value) {
                field = value
            }
        }

    /**
     * This function is responsible for updating the current steps.
     * @param [eventData][FloatArray(1) values][android.hardware.SensorEvent.values] The step counter event data
     * @return The current steps
     * @see android.hardware.SensorEvent
     * @see android.hardware.SensorEvent.values
     * @see android.hardware.SensorEvent.timestamp
     */
    override fun updateCurrentSteps(eventData: FloatArray): Boolean {
        // if the time difference is greater than the delay, set the current steps to the step count minus the initial steps
        // if the previous steps aren't initialized yet,
        return if (previousSteps.equals(0.0)) {
            previousSteps = eventData[0].toDouble()
            false
        } else {
            currentSteps = eventData[0].toDouble().minus(previousSteps)
            // set the last update to the current time
            true
        }
    }
}
