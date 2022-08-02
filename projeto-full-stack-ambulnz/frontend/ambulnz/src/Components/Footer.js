import React from 'react'
import BottomNavigation from '@mui/material/BottomNavigation';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Link } from '@mui/material';
import Typography from '@mui/material/Typography';

export default function Footer() {
    return (
        <BottomNavigation sx={{ width: "100%", backgroundColor: "black", minHeight:"15%", boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px' }}>
            <Container width="100%" sx={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                <Typography id="modal-modal-title" variant="h5" component="h2" color={"primary"}>
                    © 2022 Karen Naomi Cardoso Kubo
                </Typography>
                <Link href="https://github.com/karennkubo">
                    <GitHubIcon fontSize="large"/>
                </Link>
                <Link href="mailto:karennckubo@gmail.com" >
                    <EmailIcon fontSize="large"/>
                </Link>
                <Link href="https://www.linkedin.com/in/karen-kubo-22b929196/">
                    <LinkedInIcon fontSize="large"/>
                </Link>
                <Link href="https://wa.me/5519994380962">
                    <WhatsAppIcon fontSize="large"/>
                </Link>

            </Container>
        </BottomNavigation>
    )
}
