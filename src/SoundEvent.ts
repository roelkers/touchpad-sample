import React from 'react'
import FilterEffect from './FilterEffect'
import DelayEffect from './DelayEffect'
import SoundEffect from './SoundEffect'

class SoundEvent {
    x: any;
    y: any;
    initX: any;
    initY: any;
    effect: SoundEffect | null;
    sound: AudioBufferSourceNode | null;
    context: AudioContext;
    buffer: AudioBuffer;
    touchpadElem: React.RefObject<HTMLDivElement>

    constructor( audioContext: AudioContext, audioBuffer: AudioBuffer, touchpadElem: React.RefObject<HTMLDivElement>) {
        this.x = 0
        this.y = 0
        this.initX = this.x;
        this.initY = this.y;
        this.effect = null
        this.sound = null;
        this.context= audioContext;
        this.buffer= audioBuffer;
        this.touchpadElem = touchpadElem
    }

    setEffect(x: number, y: number) {
        if(this.effect === null) return
        this.effect.setEffect(x,y)
    }

    setupSound(effect: string) {

        var sourceNode = this.context.createBufferSource();
        sourceNode.buffer = this.buffer;
        sourceNode.loop = true;
        console.log(effect)
        if(effect === 'none' || effect === '' || !effect) {
            sourceNode.connect(this.context.destination);
        }
        else {
            if(effect === 'filter') {
                console.log("SETTING FILTER")
                this.effect = new FilterEffect(this.context, this.touchpadElem)
            }
            if(effect === 'delay') {
                this.effect = new DelayEffect(this.context, this.touchpadElem)
            }
            if(this.effect === null) return;
            const effectNode = this.effect.audioNode
            sourceNode.connect(effectNode);
            effectNode.connect(this.context.destination);
        }


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