import { defineStore } from 'pinia'

export const useEmojiStore = defineStore('emoji', () => {
  const EmojiList = ['😀', '🤣', '😅', '😉', '😍', '😘', '🙂', '🤔', '😑', '😌', '😔', '🤤', '😋', '🥵', '🤮', '😎', '😳', '😭', '😓', '😡', '😠', '🤡', '👻', '💩', '🙈', '🙉', '🙊', '💯', '💋', '💖', '👌', '🫵', '🙏', '🫦', '🌸', '🌹', '🍉']
  return { EmojiList }
})
