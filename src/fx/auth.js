
const createCredentialsEffect = (dispatch, data) => {
  // alert(`inside navigator ${data.bla}`)
  navigator.credentials.create({
    publicKey: {
      // random, cryptographically secure, at least 16 bytes
      challenge: new Uint8Array([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16
      ]).buffer,

      // relying party
      rp: {
        name: 'Gordic Health Chain' // sample relying party
      },
      user: {
        id: new Uint8Array([3, 2, 34, 43, 2, 2, 4, 2, 1, 1, 34, 2, 2
        ]).buffer, // "1234", //base64url.decode("<%= id %>"),
        name: 'Heisi', // ame %>",
        displayName: 'Captain' // "<%= displayName %>"
      },
      authenticatorSelection: {
        userVerification: 'required',
        requireResidentKey: true
      },
      attestation: 'none',
      pubKeyCredParams: [
        {
          type: 'public-key',
          alg: -7 // "ES256" IANA COSE Algorithms registry
        }
      ]
    }
  }).then(result => {
    dispatch(data.action, result)
  })
}

const getCredentialsEffect = (dispatch, data) => {
  // alert(`inside navigator ${data.bla}`)

  /*
  const allowCredentials = [{
      id: rawId,
      type: 'public-key',
      //transports: ['usb', 'ble', 'nfc'],
    }]
    console.log('allow', allowCredentials)
  */
  navigator.credentials.get({
    publicKey: {
      challenge: Uint8Array.from(
        'blabdfsdfhjsdfdslablablablabla', c => c.charCodeAt(0)),
      allowCredentials: [], // allowCredentials,
      timeout: 60000,
      userVerification: 'required'
    }
  }).then(result => {
    console.log('get credentials result')
    dispatch(data.action, result)
  }).catch(result => {
    dispatch(data.action, { id: 'That went wrong' })
  })
}

/*
<h3>Peers</h3>
<p>
  <ul>
    ${state.peers.map(p => html`<li>${p.toString()}</li>`)}
  </ul>
</p>

<h1>hallo <span>${state.value}</span></h1>
<p>
  <button onclick=${RegisterAction}>Register</button>
  <button onclick=${LoginAction}>Login</button>
</p>
*/

export { createCredentialsEffect, getCredentialsEffect }
