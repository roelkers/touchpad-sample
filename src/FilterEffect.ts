import SoundEffect from './SoundEffect'
import React from 'react'

class FilterEffect implements SoundEffect {

    audioNode: BiquadFilterNode
    touchpadElem: React.RefObject<HTMLDivElement>

    constructor (audioContext: AudioContext, touchpadElem: React.RefObject<HTMLDivElement>) {
        this.audioNode = audioContext.createBiquadFilter()
        this.touchpadElem = touchpadElem
    }

    setEffect(x: number,y: number) {
        if(this.audioNode === null || this.touchpadElem.current === null) return
        const ref = this.touchpadElem.current
        // console.log("offset top", ref.offsetTop)
        // console.log("ref clientHeight", ref.clientHeight)
        // console.log("y", y)
        var factor = 1.0 - ((y - ref.offsetTop) / (ref.clientHeight));
        // console.log("diff y", y - ref.offsetTop)
        // console.log("factor", factor)
        if (factor < 0)
            factor = 0.0;
        if (factor > 1)
            factor = 1.0;
        var value = Math.pow(2, 13 * factor);
        console.log("filter", value)
        this.audioNode.frequency.value = value;
        this.audioNode.Q.value = 20 * Math.min(1.0, Math.max(0.0, ((x - ref.offsetLeft) / ref.clientWidth)));
    }

}

export default FilterEffect