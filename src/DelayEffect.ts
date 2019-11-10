import SoundEffect from './SoundEffect'
import React from 'react'

class DelayEffect implements SoundEffect {

    audioNode: DelayNode
    feedbackNode: GainNode
    touchpadElem: React.RefObject<HTMLDivElement>

    constructor (audioContext: AudioContext, touchpadElem: React.RefObject<HTMLDivElement>) {
        this.audioNode = audioContext.createDelay()
        this.feedbackNode = audioContext.createGain()
        this.touchpadElem = touchpadElem
        this.audioNode.connect(this.feedbackNode)
        this.feedbackNode.connect(this.audioNode)
    }

    setEffect(x: number,y: number) {
        if(this.audioNode === null || this.feedbackNode === null || this.touchpadElem.current === null) return
        const ref = this.touchpadElem.current
        // console.log("offset top", ref.offsetTop)
        // console.log("ref clientHeight", ref.clientHeight)
        // console.log("y", y)
        var factor = 1 - ((y - ref.offsetTop) / (ref.clientHeight));
        // console.log("diff y", y - ref.offsetTop)
        // console.log("factor", factor)
        if (factor < 0)
            factor = 0.0;
        if (factor > 1)
            factor = 1 ;
        console.log("feedbackGain", factor)
        this.feedbackNode.gain.value = factor;
        const delayTime = 5 * Math.min(1.0, Math.max(0.0, ((x - ref.offsetLeft) / ref.clientWidth)));
        this.audioNode.delayTime.value = delayTime
        console.log("delayTime", delayTime)
    }

}

export default DelayEffect