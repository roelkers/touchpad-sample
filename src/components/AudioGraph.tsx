import React, { useState, useEffect } from 'react'
import { makeStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
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
import { effectTypes } from '../constants'

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

//   type CombinedStepIconProps = StepIconProps & MyStepIconProps

//   function ColorlibStepIcon(props: CombinedStepIconProps) {
//     const classes = useColorlibStepIconStyles();
//     const { active, completed, nodes } = props;
  

  
//     return (
//       <div
//         className={clsx(classes.root, {
//           [classes.active]: active,
//           [classes.completed]: completed,
//         })}
//       >
//         {icons[String(nodes[props.icon].icon)]}
//       </div>
//     );
//   }

const iconsMap: { [index: string]: any } = {
    input : MicIcon ,
    effect : BuildIcon,
    output : SpeakerIcon,
};

const createEffectNode = () => ({
    label: 'Effect',
    type: 'effect',
    name: 'none',
    icon: 'effect'
})

const AudioGraph = (props: IAudioGraphProps) => {
    const { setAudioGraph, audioGraph } = props
    const nodes = audioGraph
    const [activeStep, setActiveStep] = useState(2)

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };
    
    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const insertEffect = () => {
        const newNodes = nodes.slice()
        newNodes.splice(activeStep, 0, createEffectNode())
        setAudioGraph(newNodes)
    }

    const setEffectTypeForNode = (type: string) => {
        const newNodes = nodes.slice()
        newNodes[activeStep].name = type
        setAudioGraph(newNodes)
    } 

    useEffect(() => {
        setAudioGraph(nodes)
    },[nodes])

    return (
    <Box>
        <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
        {nodes.map((node: IGraphNode, index: number) => {

        const iconName = nodes[index].icon
            return (
              <Step key={node.label}>
                <StepLabel StepIconComponent={iconsMap[iconName]}>{node.label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {
            nodes[activeStep].type === 'effect' &&
            <NativeSelect
                value={nodes[activeStep].name}
                onChange={(event: any) => {
                    setEffectTypeForNode(event.target.value)
                }}
            >
            {effectTypes.map((e) => <option key={e} value={e}>{e}</option>)}
            </NativeSelect>
        }
        {
            activeStep !== nodes.length &&
            <Button 
                variant="contained"            
                color="primary"
                disabled={activeStep === 0} 
                onClick={insertEffect} >
                Add Effect
            </Button>
        }
        <Button 
            variant="contained"            
            color="primary"
            disabled={activeStep === 0} 
            onClick={handleBack} >
                Prev
        </Button>
        <Button
            variant="contained"
            color="primary"
            disabled={activeStep === nodes.length -1} 
            onClick={handleNext}
        >
            Next
        </Button>
    </Box>
    )
} 

export default AudioGraph