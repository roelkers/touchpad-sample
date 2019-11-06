import React from 'react';
import EditIcon from '@material-ui/icons/Edit'
import Button from '@material-ui/core/Button'
import { IToolbarProps } from '../interfaces'

const Toolbar = (props: IToolbarProps) => {

    const toggleConfigMode = () => props.setConfigModeOn(!props.configModeOn)

    return (
        <Button className='toolbar__edit'><EditIcon onClick={toggleConfigMode} /></Button>
    )
}

export default Toolbar