import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonIcon from '@material-ui/icons/Person';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import AlbumIcon from '@material-ui/icons/Album';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import { ISidebarProps } from '../interfaces'

export default function Sidebar(props : ISidebarProps) {

    const { sidebarOpen, setSidebarOpen } = props

    return (
    <React.Fragment>
    <Button className= 'sidebar__toggle-button' onClick={() => setSidebarOpen(true)}><MenuIcon /></Button>
    <Drawer open={sidebarOpen} onClose={() => setSidebarOpen(false)}>
        <List>
            <ListItem>
                <Link to='/play'>
                    <ListItemIcon><PlayArrowIcon /></ListItemIcon>
                    <ListItemText>Play</ListItemText>
                </Link>
            </ListItem>
            <ListItem>
                <Link to='/samples'>
                    <ListItemIcon><AlbumIcon /></ListItemIcon>
                    <ListItemText>Manage Samples</ListItemText>
                </Link>
            </ListItem>
            <ListItem>
                <Link to='/login'>
                    <ListItemIcon><PersonIcon /></ListItemIcon>
                    <ListItemText>Login</ListItemText>
                </Link>
            </ListItem>
            <ListItem>
                <Link to='/join'>
                    <ListItemIcon><PersonAddIcon /></ListItemIcon>
                    <ListItemText>Join</ListItemText>
                </Link>
            </ListItem>
        </List>
        </Drawer>
        </ React.Fragment>)
}