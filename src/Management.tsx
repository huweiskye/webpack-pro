import React, { useState } from 'react'
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import { Flex, QRCode } from 'antd';
import "./hello/world"

import './index.less'

function Management() {
   
    return <div className='test-css'>
           <QRCode
                errorLevel="H"
                value="https://ant.design/"
            />
        </div>
}

export default Management