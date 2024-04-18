
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNBackgroundStepCounterSpec.h"

@interface BackgroundStepCounter : NSObject <NativeBackgroundStepCounterSpec>
#else
#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import "SOMotionDetecter.h"

@interface BackgroundStepCounter : NSObject <RCTBridgeModule>
#endif

@end
