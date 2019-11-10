import React, { useState, useEffect, useRef } from 'react';
import Hammer from 'hammerjs'
import { fromEvent, interval} from 'rxjs'
import { map, filter, takeUntil, throttle, flatMap, switchMap, tap } from 'rxjs/operators'
import { JQueryStyleEventEmitter } from 'rxjs/internal/observable/fromEvent';
import SoundEvent from '../SoundEvent'
import { ISoundFieldIntrinsicProps, ITouchpadProps } from '../interfaces'
import SoundFieldSettings from './SoundFieldSettings'
import { initialNodes } from '../constants'

type ISoundField = ISoundFieldIntrinsicProps & ITouchpadProps

const SoundField = (props : ISoundField) => {
    const { classes, configModeOn, audioContext } = props

    const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null >(null)
    const [soundEvent, setSoundEvent] = useState<SoundEvent | null> (null)
    const touchpadElem = useRef<HTMLDivElement>(null)
    const [sampleUrl, setSampleUrl] = useState<string>('')
    const [audioGraph, setAudioGraph] = useState(initialNodes)
    
    useEffect(() => {
        if(sampleUrl !== '')  {
            var request = new XMLHttpRequest();
            request.open("GET", sampleUrl, true);
            request.responseType = "arraybuffer";

            request.onload = function() {
                audioContext.decodeAudioData( request.response, function(buffer) { 
                    console.log("set buffer")
                    setAudioBuffer(buffer)
                    setSoundEvent(new SoundEvent( audioContext, buffer, touchpadElem))
                    console.log( "Sound ready." );
                }, function(error) {
                    console.error(error)
                });
            }
            
            request.send();
         }
    }, [sampleUrl, audioContext])

    useEffect(() => {
        if(audioBuffer === null || soundEvent === null) return

        const hammerManager = new Hammer.Manager(touchpadElem.current as HTMLDivElement, undefined)
        hammerManager.add( new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, pointers: 0, threshold: 0}))

        const pan = fromEvent(hammerManager as unknown as JQueryStyleEventEmitter, 'panstart panmove panend')
        
        const onEnd = (pmEvent : any) => {
            console.log(pmEvent)
            //stop sound event if only one finger is still being used
            if(pmEvent.maxPointers === 1) {
                console.log("End. Stopping Sound.")
                soundEvent.stopSound()
            }
        }

        const panStart = pan.pipe(
            filter((e : any) => e.type === 'panstart'))
        const panMove = pan.pipe(
            filter((e : any) => e.type === 'panmove'))
        const panEnd = pan.pipe(
            filter((e : any) => e.type === 'panend'),
            map(onEnd)
        ) 
        
        const move = panStart.pipe(switchMap((e) => {
            e.preventDefault()

            if(!soundEvent.sound)
                soundEvent.setupSound(audioGraph)
            // Create observable to handle pan-move and stop on pan-end
            return panMove.pipe(
                //throttle(ev => interval(100)),
                map((pmEvent : any) => {
                    // console.log(pmEvent)
                    // console.log(pmEvent.pointers[0])
                    // console.log(pmEvent.pointers[1])
                    //console.log(soundEvent)
                    if(soundEvent) soundEvent.setEffect(pmEvent.center.x, pmEvent.center.y)
                    //console.log(pmEvent)
                    // console.log(pmEvent.center.x)
                    // console.log(pmEvent.center.y)
                }),
                takeUntil(panEnd)
                )
            }
        ))
        
        const moveSubscription = move.subscribe()
        return (() => 
            moveSubscription.unsubscribe()
        )
    })

    useEffect(() => {
        if(soundEvent === null) return 
        soundEvent.stopSound()
    },[audioGraph])

    return (
        <div ref={touchpadElem} className={`soundfield ${classes}`}>
            {configModeOn && <SoundFieldSettings audioGraph={audioGraph} setAudioGraph={setAudioGraph} storage={props.storage} setSampleUrl={setSampleUrl} folders={props.folders}/>}
        </div>
    )
}

export default SoundField