const OrbitListen = data => [
  FeedSubscription, data
]

const FeedSubscription = (dispatch, data) => {
  console.log(`db ${data.db} opening active ${data.active}`)

  window.g5_instance.feed(data.db, {
    accessController: {
      write: ['*']
    },
    replicate: true
  })
    .then(db => {
      window.g5_db = (window.g5_db || {})
      window.g5_db[data.db] = db

      db.events.on('ready', (dbname, heads) => {
        // dispatch(data.readyAction, data.db)
        console.log('ready', dbname, heads, data.db)
        dispatch(data.action)
      })

      db.events.on('write', (address, entry, heads) => {
        console.log('write', address, entry, heads)
        dispatch(data.action)
      })

      db.events.on('replicated', (address) => {
        console.log(`replicated ${data.db} ${address}`)
        dispatch(data.action)
      })

      db.events.on('replicate.progress', (address, hash, entry, progress, have) => {
        console.log(`replicate.progess ${data.db} ${address} ${hash} ${entry} ${progress} ${have}`)
      })

      db.load()
    })
  // return cleanup action
  console.log('returning cleanup function')
  return () => {
    console.log(`db ${data.db} closing`)
    window.g5_db[data.db].close().then(console.log(`db ${data.db} closed`))
  }
}

const LoadPostsEffect = (dispatch, data) => {
  console.log(`loading feed posts ${data.db}`)

  // check current head

  const all = window.g5_db[data.db]
    .iterator({ limit: -1 })
    .collect()

  console.log('posts', all)
  // DEBUG - show fake post
  if (data.db === 'debug') {
    console.log('showing fake posts')
    dispatch(data.action, {
      db: data.db,
      posts: [
        {
          payload: {
            value: {
              post: 'dummy text entry'
            }
          },
          identity: {
            id: 'dummy identity'
          }
        },
        {
          payload: {
            value: {
              post: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=='
            }
          },
          identity: {
            id: 'dummy identity'
          }
        }
      ]
    })
  } else {
    dispatch(data.action, { db: data.db, posts: all })
  }
}

export { OrbitListen, FeedSubscription, LoadPostsEffect }
