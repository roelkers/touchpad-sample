import React from 'react'

class SoundEvent {
    x: any;
    y: any;
    initX: any;
    initY: any;
    filter: BiquadFilterNode | null;
    sound: AudioBufferSourceNode | null;
    context: AudioContext;
    buffer: AudioBuffer;
    touchpadElem: React.RefObject<HTMLDivElement>

    constructor( audioContext: AudioContext, audioBuffer: AudioBuffer, touchpadElem: React.RefObject<HTMLDivElement>) {
        this.x = 0
        this.y = 0
        this.initX = this.x;
        this.initY = this.y;
        this.filter = null
        this.sound = null;
        this.context= audioContext;
        this.buffer= audioBuffer;
        this.touchpadElem = touchpadElem
    }

    setFilter(x: number,y: number) {
        if(this.filter === null || this.touchpadElem.current === null) return
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
        this.filter.frequency.value = value;
        this.filter.Q.value = 20 * Math.min(1.0, Math.max(0.0, ((x - ref.offsetLeft) / ref.clientWidth)));
    }

    setupSound() {
        var sourceNode = this.context.createBufferSource();
        sourceNode.buffer = this.buffer;
        sourceNode.loop = true;
        this.filter = this.context.createBiquadFilter();

        sourceNode.connect(this.filter);
        this.filter.connect(this.context.destination);
        this.sound = sourceNode;

        console.log("starting sound")
        if(this.sound)
            this.sound.start(0)
    }

    stopSound() {
        if (this.sound)
            this.sound.stop(0);
        console.log("stopping source node")
        this.sound = null
    }
}


export default SoundEvent