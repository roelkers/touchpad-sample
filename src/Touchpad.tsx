import React from 'react';
import SoundField from './SoundField'

const Touchpad = () => {

    return (
        <div className='touchpad'>
            <SoundField classes='soundfield--pink'/>
            <SoundField classes='soundfield--turquoise'/>
            <SoundField classes='soundfield--green' />
            <SoundField classes='soundfield--yellow'/>
        </ div>
        )
}

export default Touchpad