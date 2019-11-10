import React, { useState, useEffect } from 'react'
import { makeStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import Box from '@material-ui/core/Box';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import SpeakerIcon from '@material-ui/icons/Speaker';
import MicIcon from '@material-ui/icons/Mic';
import StepConnector from '@material-ui/core/StepConnector';
import BuildIcon from '@material-ui/icons/Build';
import { StepIconProps } from '@material-ui/core/StepIcon';
import clsx from 'clsx';
import NativeSelect from '@material-ui/core/NativeSelect';
import  { IGraphNode, IAudioGraphProps } from '../interfaces'

const ColorlibConnector = withStyles({
    alternativeLabel: {
      top: 22,
    },
    active: {
      '& $line': {
        backgroundImage:
          'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
      },
    },
    completed: {
      '& $line': {
        backgroundImage:
          'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
      },
    },
    line: {
      height: 3,
      border: 0,
      backgroundColor: '#eaeaf0',
      borderRadius: 1,
    },
  })(StepConnector);

const useColorlibStepIconStyles = makeStyles({
    root: {
      backgroundColor: '#ccc',
      zIndex: 1,
      color: '#fff',
      width: 50,
      height: 50,
      display: 'flex',
      borderRadius: '50%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    active: {
      backgroundImage:
        'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
      boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    completed: {
      backgroundImage:
        'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    },
  });

  function ColorlibStepIcon(props: StepIconProps) {
    const classes = useColorlibStepIconStyles();
    const { active, completed } = props;
  
    const icons: { [index: string]: React.ReactElement } = {
      1: <MicIcon />,
      2: <BuildIcon />,
      3: <SpeakerIcon />,
    };
  
    return (
      <div
        className={clsx(classes.root, {
          [classes.active]: active,
          [classes.completed]: completed,
        })}
      >
        {icons[String(props.icon)]}
      </div>
    );
  }

const AudioGraph = (props: IAudioGraphProps) => {

    const initialNodes= [
      {
        label: 'Input',
        icon: 'input'
      },
      {
        label: 'Effect',
        icon: 'effect'
      },
      {
        label: 'Output',
        icon: 'output'
      }  
    ]

    const effectTypes = [
        'none',
        'filter',
        'delay'
    ]
 
    const [nodes, setNodes] = useState(initialNodes)
    const [activeStep, setActiveStep] = useState(3)
    const [effectType, setEffectType] = useState('')

    useEffect(() => {
        props.setEffect(effectType)
    },[effectType])

    return (
    <Box>
        <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
        {nodes.map((node: IGraphNode, index: number) => {

            return (
              <Step key={node.label}>
                <StepLabel StepIconComponent={ColorlibStepIcon} >{node.label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {
            <NativeSelect
                value={effectType}
                onChange={(event: any) => {
                    setEffectType(event.target.value)
                }}
            >
            {effectTypes.map((e) => <option key={e} value={e}>{e}</option>)}
            </NativeSelect>
        }
    </Box>
    )
} 

export default AudioGraph