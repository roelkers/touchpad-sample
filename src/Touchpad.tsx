import React from 'react';
import SoundField from './SoundField'
import { ITouchpadProps } from './interfaces'

const Touchpad = (props: ITouchpadProps) => {

    return (
        <div className='touchpad'>
            <SoundField {...props} classes='soundfield--pink'/>
            <SoundField {...props} classes='soundfield--turquoise'/>
            <SoundField {...props} classes='soundfield--green' />
            <SoundField {...props} classes='soundfield--yellow'/>
        </ div>
        )
}

export default Touchpad