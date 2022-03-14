import * as Typebot from '../../src'

beforeEach(() => {
  document.body.innerHTML = ''
})

it('should create the message', () => {
  expect.assertions(2)
  Typebot.initBubble({
    proactiveMessage: { textContent: 'Hi click here!' },
    publishId: 'typebot-id',
  })
  const paragraphElement = document.querySelector(
    '#typebot-bubble > .proactive-message > p'
  )
  const closeButton = document.querySelector(
    '#typebot-bubble > .proactive-message > .close-button'
  )
  expect(paragraphElement?.textContent).toBe('Hi click here!')
  expect(closeButton).toBeTruthy()
})

it('should have the corresponding avatar', () => {
  expect.assertions(1)
  Typebot.initBubble({
    proactiveMessage: {
      textContent: 'Hi click here!',
      avatarUrl: 'https://website.com/my-avatar.png',
    },
    publishId: 'typebot-id',
  })
  const avatarElement = document.querySelector(
    '#typebot-bubble > .proactive-message > img'
  ) as HTMLImageElement
  expect(avatarElement.src).toBe('https://website.com/my-avatar.png')
})

it("shouldn't have opened class if delay not defined", () => {
  expect.assertions(1)
  Typebot.initBubble({
    proactiveMessage: {
      textContent: 'Hi click here!',
    },
    publishId: 'typebot-id',
  })
  const bubble = document.querySelector('#typebot-bubble') as HTMLDivElement
  expect(bubble.classList.contains('message-opened')).toBe(false)
})

it('should show almost immediately if delay is 0', async () => {
  expect.assertions(1)
  Typebot.initBubble({
    proactiveMessage: {
      textContent: 'Hi click here!',
      delay: 0,
    },
    publishId: 'typebot-id',
  })
  const bubble = document.querySelector('#typebot-bubble') as HTMLDivElement
  await new Promise((r) => setTimeout(r, 1))
  expect(bubble.classList.contains('message-opened')).toBe(true)
})

it('show after the corresponding delay', async () => {
  expect.assertions(2)
  Typebot.initBubble({
    proactiveMessage: {
      textContent: 'Hi click here!',
      delay: 1000,
    },
    publishId: 'typebot-id',
  })
  const bubble = document.querySelector('#typebot-bubble') as HTMLDivElement
  expect(bubble.classList.contains('message-opened')).toBe(false)
  await new Promise((r) => setTimeout(r, 1000))
  expect(bubble.classList.contains('message-opened')).toBe(true)
})