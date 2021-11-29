import { addScriptElement } from './utils/lazyScript.js'

const networkConnectEffect = async (dispatch, data) => {
  await addScriptElement('ipfs', '/lib/ipfs-core-0.8/dist/index.min.js')
  const node = await window.IpfsCore.create({
    preload: {
      enabled: false
    },
    config: {
      Addresses: {
        Swarm: [
          '/dns4/signal.gordic5.com/tcp/443/wss/p2p-webrtc-star/',
          '/dns6/signal.gordic5.com/tcp/443/wss/p2p-webrtc-star/'
        ]
      },
      Bootstrap: [],
      Discovery: {
        webRTCStar: {
          enabled: true
        }
      },
      Pubsub: {
        enabled: true
      }
    }
  })
  window.g5_node = node
  const id = await node.id()
  console.log('node id', id)
  dispatch(data.action, id)
}

const networkAuthenticateEffect = async (dispatch, data) => {
  await addScriptElement('orbit', '/lib/orbit-db-0.26.1/dist/orbitdb.js')

  // eslint-disable-next-line no-undef
  const instance = await OrbitDB.createInstance(window.g5_node)
  window.g5_instance = instance

  dispatch(data.action)
}

const networkAddFilesEffect = async (dispatch, data) => {
  console.log('adding files to network', data.files)
  const fileListArray = Array.from(data.files)

  await Promise.all(fileListArray.map(async (file) => {
    console.log('i got this file ', file)
    const reader = new FileReader()
    reader.onload = async (e) => {
      const buffer = e.target.result
      console.log('file buffer is ', buffer)
      // const cid = await newtworkAddFile(buffer)
      const event = {
        target: {
          value: buffer
        }
      }
      dispatch(data.action, event)
      console.log('uploaded file', event)
    }
    reader.readAsDataURL(file)
  }))

  dispatch(data.onFinish)
}

// see https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/FILES.md#ipfsadddata-options
// const newtworkAddFile = (data) => {
//   // data.content should be a FileContent Uint8Array | Blob | String | Iterable<Uint8Array> | Iterable<number> | AsyncIterable<Uint8Array> | ReadableStream<Uint8Array>
//   const buf = data ?? new Uint8Array(['G', '5'])

//   return window.g5_node.add(buf, {
//     cidVersion: 1,
//     pin: true
//   })
//     .then(fsEntry => {
//       const cid = fsEntry.cid.toString()
//       return cid
//     })
//     .catch(
//       e => console.log('error uploading file', e)
//     )
// }

export {
  networkConnectEffect,
  networkAuthenticateEffect,
  networkAddFilesEffect
}
