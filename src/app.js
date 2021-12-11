import { app } from 'hyperapp'
import html from 'hyperlit'

import { networkAddFilesEffect, networkConnectEffect, networkAuthenticateEffect } from './fx/network.js'
import { OrbitListen, LoadPostsEffect } from './fx/orbit.js'

// "network boot sequence"
const NETWORK_OFFLINE = 'network_offline'
const NETWORK_CONNECTING = 'network_connecting'
const NETWORK_CONNECTED = 'network_connected'
const NETWORK_AUTHENTICATING = 'network_authenticating'
const NETWORK_ONLINE = 'network_online'

const NetworkConnectAction = (state) => {
  return [
    {
      ...state,
      network: NETWORK_CONNECTING
    },
    [networkConnectEffect, { action: NetworkConnectedAction }]
  ]
}

const NetworkConnectedAction = (state, id) => ({
  ...state,
  id: id,
  network: NETWORK_CONNECTED
})

const NetworkAuthenticateAction = (state) => [{
  ...state,
  network: NETWORK_AUTHENTICATING
},
[networkAuthenticateEffect, { action: NetworkOnlineAction }]
]

const NetworkOnlineAction = (state) => ({
  ...state,
  network: NETWORK_ONLINE
})

const NetworkView = (state) => {
  switch (state.network) {
    case NETWORK_OFFLINE: return html`
      <p>You should start a network node.</p>
      <button onclick=${NetworkConnectAction}>Go online</button>
    `
    case NETWORK_CONNECTING: return html`
      <p>Great. Starting the network.</p>
    `
    case NETWORK_CONNECTED: return html`
      <p>You should now authenticate.</p>
      <button onclick=${NetworkAuthenticateAction}>Authenticate</button>
    `
    case NETWORK_AUTHENTICATING: return html`
      <p>Setting up your identity.</p>
    `
    case NETWORK_ONLINE: return html`
      <p>Yay, you are online as ${state.id.id.toString()}.</p>
    `
  }
}

const OpenFeedAction = (state, event) => [{
  ...state,
  openFeedName: '',
  editFeed: true,
  editFeedName: state.openFeedName,
  posts: []
}]

const UpdateOpenFeedNameAction = (state, event) => ({
  ...state,
  openFeedName: event.target.value
})

const AddPostEffect = (dispatch, data) => {
  console.log(`adding post t${data}`)
  window.g5_db[data.db].add({ post: data.post })
}

const UpdateAddPostTextAction = (state, event) => {
  return {
    ...state,
    addPostText: event.target.value
  }
}

const AddPostAction = (state) => [{
  ...state,
  addPostText: ''
  //  posts: [...state.posts, state.addPostText]
}, [AddPostEffect, {
  db: state.editFeedName,
  post: state.addPostText
}]
]

const AddFileAction = (state, event) => [{
  ...state,
  uploading: true
}, [networkAddFilesEffect, {
  files: event.target.files,
  onFinish: FinishFileAction,
  action: UpdateAddPostTextAction
}]
]

const FinishFileAction = (state) => {
  console.log('finishFileAction')
  const x = {
    ...state,
    uploading: false
  }
  return x
}

const AddPostsAction = (state, update) => {
  console.log('addPostsAction', update)
  const x = {
    ...state,
    posts: update.posts
  }
  console.log('state', x)
  return x
}

const LoadPostsAction = (state) => [
  {
    ...state
  },
  [LoadPostsEffect, { db: state.editFeedName, action: AddPostsAction }]
]

const SetPeersAction = (state, peers) =>
({
  ...state,
  peers: peers
})

const IpfsSwarmListen = data => [
  IpfsSwarmSubscription, data
]

const IpfsSwarmSubscription = (dispatch, data) => {
  // ...

  setInterval(async () => {
    const peers = await window.g5_node.swarm.peers()
    dispatch(data.action, peers)
  }, 2000)
}

const PostValueView = (post) => {
  const isPng = /^data:image\//

  if (isPng.test(post)) {
    return html`<img src=${post} />`
  }

  // fallback
  return html`<span>${post}</span>`
}


const RenderEffect = (dispatch, data) => {
  alert(`rendering report`)

  let session = pl.create()
  session.consult('logic/perfusion.pl', {
    success: () => {
      console.log('success parsing')
      session.query('render.', {
        success: (goal) => {
          console.log('success querying')

          session.answer({
            success: function (answer) {
              console.log('success answering')

              alert(answer)
            },
            fail: function () { console.log('none found') },
            limit: function () { console.log('limit exceeded') },
            error: function (err) { console.log(err) }
          })
        },
        fail: function () { console.log('none found') },
        limit: function () { console.log('limit exceeded') },
        error: function (err) { console.log(err) }
      })



    },
    error: (err) => alert(err)
  })




}

const RenderAction = (state) => {
  return [{ ...state }, [RenderEffect, {}]]
}


const View = (state) => html`
<body>
  <header>
    <p>This is a prototype. Handle with care. Made by Gordic 5olutions</p>
  </header>
  <main>


    <section>
      <h1>Befundung</h1>

      <label for="input_groess">Größe</label>
      <input id="input_groesse" type="number" value="180" />

      <label for="input_gewicht">Gewicht</label>
      <input id="input_gewicht" type="number" value="90" />

      <label for="input_geschlecht">Geschlecht</label>
      <select id="input_geschlecht">
        <optgroup label="Untersuchtungstyp">
          <option>
            männlich
          </option>
          <option>
            weiblich
          </option>
        </optgroup>
      </select>

      <label for="input_edv">EDV</label>
      <input id="input_edv" type="number" value="213" />
      <label for="input_esv">Gewicht</label>
      <input id="input_esv" type="number" value="153" />
      <label for="input_wandmasse">Wandmasse</label>
      <input id="input_wandmasse" type="number" value="0" />

    </section>


    <section>
      <h1>Ausgabe</h1>
      <p>
        <label for="select">Untersuchtungstyp</label>
        <select id="select">
          <optgroup label="Untersuchtungstyp">
            <option>
              Perfusion
            </option>
            <option>
              Myokarditis
            </option>
            <option>
              Vitalität
            </option>
            <option>
              Kardiomyopathie
            </option>
            <option>
              Fallot
            </option>
            <option>
              Aorta
            </option>
            <option>
              Ista
            </option>
            <option>
              Tumor
            </option>
            <option>
              Diastolische Dysfunktion
            </option>
          </optgroup>
        </select>


        <div>
          <button id="render" type="button" onclick=${RenderAction}>Render</button>
        </div>
      </p>

      <div id="ausgabe"></div>
    </section>

  </main>
  <footer>
    copyright by gordic5.com
  </footer>
</body>
`

app({
  init: [
    // inital state
    {
      network: NETWORK_OFFLINE,
      // peer addresses to show
      peers: ['dummy', '12polizei'],
      id: {},

      // FEEDS
      // a key-value map of the feeds we currently subscribe
      // openFeeds: {},
      // the name of the feed we want to open
      openFeedName: '',

      // EDIT FEED
      // can just edit one feed at a time
      editFeed: false,
      editFeedName: '',
      posts: [],
      addPostText: ''
    }

    // inital effects
    // [initIpfsEffect, { action: SetIpfsAction }]
  ],
  view: View,
  subscriptions: (state) => [
    state.editFeed && OrbitListen({
      db: state.editFeedName,
      // Action is dispatched, when updated
      action: LoadPostsAction
    }),
    (state.network === NETWORK_ONLINE) && IpfsSwarmListen({ action: SetPeersAction })
  ],

  node: document.getElementById('app')
})
