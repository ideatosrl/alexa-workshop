const { isType } = require('../utils/requests')
const blog = require('../api/blog')

const canHandle = handlerInput => isType(handlerInput, 'LaunchRequest') || isType(handlerInput, 'SessionEndedRequest')
const handle = async handlerInput => {
  let speechText
  const requestAttributes = handlerInput.attributesManager.getRequestAttributes()
  try {
    const post = await blog.getFirstPost()

    speechText = await requestAttributes.translate('launch', {
      title: `<p>${post.title}</p>`
    })
  } catch (e) {
    speechText = await requestAttributes.translate('error')
  }

  return handlerInput.responseBuilder
    .speak(speechText)
    .withShouldEndSession(false)
    .getResponse()
}

module.exports = {
  canHandle,
  handle
}
