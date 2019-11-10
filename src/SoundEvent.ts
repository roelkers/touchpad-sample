import React from 'react'
import FilterEffect from './FilterEffect'
import DelayEffect from './DelayEffect'
import SoundEffect from './SoundEffect'
import { IGraphNode, effectType } from './interfaces'
import { effectTypes } from './constants';

class SoundEvent {
    x: any;
    y: any;
    initX: any;
    initY: any;
    effects: SoundEffect[] | null;
    sound: AudioBufferSourceNode | null;
    context: AudioContext;
    buffer: AudioBuffer;
    touchpadElem: React.RefObject<HTMLDivElement>

    constructor( audioContext: AudioContext, audioBuffer: AudioBuffer, touchpadElem: React.RefObject<HTMLDivElement>) {
        this.x = 0
        this.y = 0
        this.initX = this.x;
        this.initY = this.y;
        this.effects = null
        this.sound = null;
        this.context= audioContext;
        this.buffer= audioBuffer;
        this.touchpadElem = touchpadElem
    }

    setEffect(x: number, y: number) {
        if(this.effects === null) return
        for(let effect of this.effects) {
            console.log(effect)
            effect.setEffect(x,y)
        }
    }

    setupSound(audioGraph: IGraphNode[]) {

        var sourceNode = this.context.createBufferSource();
        sourceNode.buffer = this.buffer;
        sourceNode.loop = true;
        this.effects = new Array<SoundEffect>()
        let lastNode: AudioNode = sourceNode
        console.log(audioGraph)
        for(let node of audioGraph) { 
            if (node.type === 'effect') {
                const effectName = node.name
                console.log(effectName)
                let effect
                if(effectName === 'none' || effectName === '' || !effectName) {
                    //do nothing
                }
                else {
                    if(effectName === 'filter') {
                        console.log("set up filter")
                        effect = new FilterEffect(this.context, this.touchpadElem)
                    }
                    if(effectName === 'delay') {
                        console.log("set up delay")
                        effect = new DelayEffect(this.context, this.touchpadElem)
                    }
                    if(!effect || !this.effects) return;
                    console.log("connect effect")
                    this.effects.push(effect)
                    const effectNode = effect.audioNode
                    lastNode.connect(effectNode);
                    lastNode = effectNode
                    console.log(lastNode)
                }
            }
        }
        lastNode.connect(this.context.destination);
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