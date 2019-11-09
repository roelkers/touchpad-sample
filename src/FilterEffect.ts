import SoundEffect from './SoundEffect'

class FilterEffect extends SoundEffect {

    constructor (audioContext: AudioContext) {
        super()
        this.audioNode = audioContext.createBiquadFilter()
    }
}

export default FilterEffect