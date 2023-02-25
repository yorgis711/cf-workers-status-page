import { handleEvent } from 'flareact'
import { processCronTrigger } from './src/functions/cronTrigger'

/**
 * The DEBUG flag will do two things that help during development:
 * 1. we will skip caching on the edge, which makes it easier to
 *    debug.
 * 2. we will return an error message on exception in your Response rather
 *    than the default 404.html page.
 */
const DEBUG = false

addEventListener('fetch', (event) => {
  try {
    event.respondWith(
      handleEvent(event, require.context('./pages/', true, /\.js$/), DEBUG),
    )
  } catch (e) {
    if (DEBUG) {
      return event.respondWith(
        new Response(e.message || e.toString(), {
          status: 500,
        }),
      )
    }
    event.respondWith(new Response('Internal Error', { status: 500 }))
  }
})

  async fetch(request, env) {
    env.WEATHER.writeDataPoint({
      'blobs': ["Seattle", "USA", "pro_sensor_9000"],
      'doubles': [25, 0.5],
      'indexes': ["a3cd45"] // Sensor ID
    });
    return new Response("OK!");
  }

addEventListener('scheduled', (event) => {
  event.waitUntil(processCronTrigger(event))
})
