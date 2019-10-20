import React, { useState, useEffect, useRef } from 'react';
import Hammer from 'hammerjs'
import { fromEvent, interval} from 'rxjs'
import { map, filter, takeUntil, throttle, flatMap, switchMap, tap } from 'rxjs/operators'
import { JQueryStyleEventEmitter } from 'rxjs/internal/observable/fromEvent';
import SoundEvent from './SoundEvent'
import { ISoundFieldIntrinsicProps, ITouchpadProps } from './interfaces'
import SoundFieldSettings from './SoundFieldSettings'

type ISoundField = ISoundFieldIntrinsicProps & ITouchpadProps

const SoundField = (props : ISoundField) => {
    const { classes, configModeOn, audioContext } = props

    const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null >(null)
    const [soundEvent, setSoundEvent] = useState<SoundEvent | null> (null)
    const touchpadElem = useRef<HTMLDivElement>(null)
    const [sampleUrl, setSampleUrl] = useState<string>('')

    useEffect(() => {
        console.log(sampleUrl)
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
    }, [sampleUrl])

    useEffect(() => {
        if(audioBuffer === null || soundEvent === null) return

        const hammerManager = new Hammer(touchpadElem.current as HTMLDivElement, undefined)
        hammerManager.get('pan').set({ direction: Hammer.DIRECTION_ALL})

        const pan = fromEvent(hammerManager as unknown as JQueryStyleEventEmitter, 'panstart panmove panend')
        // const panMove = fromEvent(hammerManager, 'panmove')  
        
        const onEnd = () => {
            console.log("End. Stopping Sound.")
            soundEvent.stopSound()
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

            soundEvent.setupSound()
            // Create observable to handle pan-move and stop on pan-end
            return panMove.pipe(
                //throttle(ev => interval(100)),
                map((pmEvent : any) => {
                    
                    if(soundEvent) soundEvent.setFilter(pmEvent.center.x, pmEvent.center.y)
                    //console.log(pmEvent)
                    console.log(pmEvent.center.x)
                    console.log(pmEvent.center.y)
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

    return (
        <div ref={touchpadElem} className={`soundfield ${classes}`}>
            {configModeOn && <SoundFieldSettings storage={props.storage} setSampleUrl={setSampleUrl} files={props.files}/>}
        </div>
    )
}

export default SoundField