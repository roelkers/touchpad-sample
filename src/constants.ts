import { IGraphNode } from './interfaces'

export const initialNodes: IGraphNode[]= [
    {
      label: 'Input',
      type: 'input',
      name: 'input',
      icon: 'input'
    },
    {
      label: 'Effect',
      type: 'effect',
      name: 'filter',
      icon: 'effect'
    },
    {
      label: 'Output',
      type: 'output',
      name: 'output',
      icon: 'output'
    }  
  ]

export const effectTypes = [
      'none',
      'filter',
      'delay'
  ]
