import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import VideoCallRoundedIcon from '@mui/icons-material/VideoCallRounded';
import TourRoundedIcon from '@mui/icons-material/TourRounded';
import CampaignRoundedIcon from '@mui/icons-material/CampaignRounded';
import GroupsIcon from '@mui/icons-material/Groups';
import EventIcon from '@mui/icons-material/Event';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import LinearScaleIcon from '@mui/icons-material/LinearScale';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import VideoCallIcon from '@mui/icons-material/VideoCall';

import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';  
import DarkModeIcon from '@mui/icons-material/DarkMode';
import FeedbackIcon from '@mui/icons-material/Feedback';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import LockPersonIcon from '@mui/icons-material/LockPerson';
import LockIcon from '@mui/icons-material/Lock';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import MultipleStopIcon from '@mui/icons-material/MultipleStop';
import LanguageIcon from '@mui/icons-material/Language';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import EmailIcon from '@mui/icons-material/Email';
import ReportIcon from '@mui/icons-material/Report';

export const appMenuList = [
  {icon: <BorderColorRoundedIcon />, text: "Post"},
  {icon: <AutoStoriesRoundedIcon />, text: "Story"},
  {icon: <VideoCallRoundedIcon />, text: "Room"},
  {icon: <TourRoundedIcon />, text: "Page"},
  {icon: <CampaignRoundedIcon />, text: "Ad"},
  {icon: <GroupsIcon />, text: "Group"},
  {icon: <EventIcon />, text: "Event"},
  {icon: <ShoppingBagIcon />, text: "Maketplace listing"},
]


export const acountList = [
  {
    icon: <SettingsIcon />,
    subicon: <ArrowForwardIosIcon />,
    text: "Setting & privacy",
    children: {
      icon: <KeyboardBackspaceIcon />,
      text: "Setting & privacy",
      data: [
        {
          text: "Settings",
          icon: <SettingsIcon />,
        },
        {
          text: "Privacy Checkup",
          icon: <LockPersonIcon />,
        },
        {
          text: "Privacy Center",
          icon: <LockIcon />,
        },
        {
          text: "Active Log",
          icon: <FormatListNumberedIcon />,
        },
        {
          text: "Feed",
          icon: <MultipleStopIcon />,
        },
        {
          text: "Language",
          icon: <LanguageIcon />,
        },
      ]
    }
  },
  {
    icon: <HelpIcon />,
    subicon: <ArrowForwardIosIcon />, 
    text: "Help & support",
    children: {
      icon: <KeyboardBackspaceIcon />,
      text: "Help & support",
      data: [
        {
          text: "Help Center",
          icon: <HelpIcon />,
        },
        {
          text: "Support Inbox",
          icon: <EmailIcon />,
        },
        {
          text: "Report a problem",
          icon: <ReportIcon />,
        },
      ]
    }
  },
  {icon: <DarkModeIcon />, text: "Display & accesibility"},
  {icon: <FeedbackIcon />, text: "Give feedback"},
  {icon: <LogoutIcon />, text: "Logout"},

]

export const colorObejct = [
  {
    className: "rainBow"
  },
  {
    className: "marColor"
  },
  {
    className: "iceColor"
  },
  {
    className: "roseAndRed"
  },
]
