import React from 'react'
import { FaRegStar, FaStar  } from 'react-icons/fa'
import {BiPencil,BiSolidInbox} from 'react-icons/bi'
import {RiMailSendLine} from 'react-icons/ri'
import { MdLabelImportantOutline, MdLabelImportant, MdDeleteOutline } from 'react-icons/md'


export const sidebarInfo = [
  {
    id: 1,
    text:"Inbox",
    onClickId: 'inbox',
    icon: <BiSolidInbox/>,
  },
  {
    id: 2,
    text:"Sent",
    onClickId: 'sent',
    icon: <RiMailSendLine />,
  },
  {
    id: 4,
    text:"Starred",
    onClickId: 'starred',
    icon: <FaRegStar />,
  },
  {
    id: 4,
    text:"Important",
    onClickId: 'important',
    icon: <MdLabelImportantOutline />,
  },
]