#define PUMP_PIN 32
extern "C" {
	#include "freertos/FreeRTOS.h"
	#include "freertos/timers.h"
}

#include "emsesp.h"


class Pump {
	public:
		static void 			setPump(bool state,bool force = false);
		static uint8_t			m_bPumpOn;
	private:
		static TimerHandle_t 	m_pumpStartTimer;
		static TimerHandle_t 	m_pumpStopTimer;
		static TimerHandle_t 	m_pumpForceTimer;
		static bool 			m_bInitialized;
		static void 			StartPump();
		static void 			StopPump();
		static void				Initialize();
	    static uuid::log::Logger logger_;
};  

