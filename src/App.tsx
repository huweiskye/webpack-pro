import React, { useState, useCallback, useEffect } from 'react'
import { Button, Menu, Input, Switch } from 'antd';
import "./hello/world"
import axios from 'axios';

import { useTranslation } from 'react-i18next';

import './index.less'
import './global.less'



const App: React.FC = () => {
    const { t, i18n } = useTranslation();
    const [message, setMessage] = useState('');
    const [resData, setResData] = useState<any>();
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState<boolean>(false);

    const toggleCollapsed = useCallback(() => {
        setCollapsed((collapsed) => !collapsed);
    }, []);

    console.log('-----------message-------999999999999999---------', message)
    

    // const handleClick = async () => {
    //     try {
    //         // 发送请求到Node.js服务器
    //         const response = await axios.get(`http://47.97.2.52:3333/api/todo`);
    //         console.log('Data received from API:', response.data); // 打印返回的数据
    //         setResData(response.data)
    //         //alert(`Todo: ${response.data.title}`); // 可以在页面上展示数据
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    // };

    const handleClick = async () => {
        try {
            const response = await axios.post('http://localhost:3333/api/updateUsers', {
                username: username,
                password: password,
                status: status ? 'deActive' : 'active'
            });
            console.log('Data received from API:', response.data); // 打印返回的数据
            //setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    console.log('-----------username-------11111111111111111---------', username)
    console.log('-----------password-------22222222222222222---------', password)
    console.log('-----------status-------3333333333333333333---------', status)

    ///api/users

    const getApiFunc = () => {
        //fetch('http://localhost:3333/api')
        //
        fetch(`${window.location.hostname}:3333/api`)
        .then(res => {
            return res.json()
        })
        .then(data => {
            //console.log('===data=======999999999999999999999===========', data)
            setMessage(data?.message)
        })
        .catch(err => {
            console.error('Fetch error:', err);
        });
    }
    // //api/sendDataFunc

    const getTestFunc = () => {
        //fetch('http://localhost:3333/api/sendDataFunc')
        fetch('/api/getData')
        .then(res => {
            return res.json()
        })
        .then(data => {
            console.log('===data=======999999999999999999999===========', data)
            //setMessage(data?.message)
        })
        .catch(err => {
            console.error('Fetch error:', err);
        });
    }

    const items: any = [
        {
            key: 0,
            label: 'IntroMenu',
        },
        {
            key: 1,
            label: 'Hello',
            children: [
                {
                    key: '1-1',
                    label: 'SF',
                },
                {
                    key: '1-2',
                    label: 'London',
                },
                {
                    key: '1-3',
                    label: 'LA',
                },
                {
                    key: '1-4',
                    label: 'San',
                },
            ],
        },
    ];

    useEffect(() => {
        const lang = navigator.language;
        i18n.changeLanguage(lang);
    }, [navigator.language]);


    return <div style={{ width: 256, padding: 16, background: '#f4f6f7' }}>
        <h2 onClick={() => handleClick()}>{t('welcome')}</h2>
        <h6>{resData?.userId}</h6>
        <Input placeholder="username" value={username} onChange={e => setUsername(e.target.value)} />
        <Input placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
        <Switch value={status} onChange={checked => setStatus(checked)}/>
        <Menu mode="inline" items={items} inlineCollapsed={collapsed} style={{height: '100%'}}/>
     </div>
}

export default App