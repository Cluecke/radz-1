const addScriptElement = (name, src) => new Promise((resolve, reject) => {
  const loadAttribute = `${name}-loaded`
  if (!document.querySelector(`[${loadAttribute}]`)) {
    const script = document.createElement('script')
    script.onload = async () => {
      script.setAttribute(loadAttribute, 'true')
      resolve()
    }
    script.onerror = async ($err) => {
      reject($err)
    }
    script.src = src
    script.defer = true
    document.head.appendChild(script)
  }
})

export { addScriptElement }
