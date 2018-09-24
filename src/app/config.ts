export function config() {
    return {
        app: {
            name: 'Cyber Sherlock',
            url_client: 'http://localhost:4201',
            url_server: 'http://localhost:3080',
            default_lang: 'EN',
            facebook: {},
            google: {
                apiKey: 'AIzaSyCQqiOB_uS2YEbV5d9vsPUpb4s5VavxulQ',
                clientId: '614754642660-hhpv7vv258h3f4h55uavv5glnhb46ctu.apps.googleusercontent.com',
                clientSecret: '460dDbvoTichx4JLr4E_RDse',
                scopes: 'profile'
            },
            linked: {},
            twitter: {},
            instagram: {
                clientId: 'e014c1db034945a398132078f975da0f',
                clientSecret: 'dff6c255d0804bbdb96749db2a42a27c'
            },
            topnav: [
                {
                    name: 'map',
                    icon: 'map',
                    disabled: false,
                    login: false
                },
                {
                    name: 'howto',
                    icon: 'live_help',
                    disabled: false,
                    login: false
                },
                {
                    name: 'about',
                    icon: 'public',
                    disabled: false,
                    login: false
                },
                {
                    name: 'events',
                    icon: 'public',
                    disabled: true,
                    login: false
                },
                {
                    name: 'contacts',
                    icon: 'contact_mail',
                    disabled: true,
                    login: false
                },
                {
                    name: 'enter',
                    icon: 'person_add',
                    disabled: false,
                    login: true
                },
                {
                    name: 'exit',
                    icon: 'exit_to_app',
                    disabled: false,
                    login: true
                }
            ],
            dash: {
                categories: [
                    {
                        name: 'people',
                        icon: 'people',
                        auth: true,
                        actions: [
                            {
                                action: 'find',
                                icon: 'my_location',
                                state: false
                            },
                            {
                                action: 'contact',
                                icon: 'contact',
                                state: true
                            },
                            {
                                action: 'hide',
                                icon: 'flip_to_back',
                                state: false
                            }
                        ]
                    },
                    {
                        name: 'media',
                        icon: 'add_a_photo',
                        auth: false,
                        selected: true,
                        actions: [
                            {
                                action: 'find',
                                icon: 'my_location',
                                state: false
                            },
                            {
                                action: 'filter',
                                icon: 'select_all',
                                state: false
                            },
                            {
                                action: 'add',
                                icon: 'add_circle_outline',
                                auth: false
                            },
                            {
                                action: 'edit',
                                icon: 'edit_location',
                                auth: false
                            },
                            {
                                action: 'delete',
                                icon: 'remove_circle_outline',
                                auth: false
                            },
                            {
                                action: 'hide',
                                icon: 'flip_to_back',
                                auth: false,
                                selected: false
                            }
                        ]
                    },
                    {
                        name: 'tasks',
                        icon: 'motorcycle',
                        auth: true,
                        actions: [
                            {
                                action: 'find',
                                icon: 'my_location',
                                state: false
                            },
                            {
                                action: 'add',
                                icon: 'add_circle_outline',
                                state: true
                            },
                            {
                                action: 'edit',
                                icon: 'edit_location',
                                auth: true
                            },
                            {
                                action: 'copy',
                                icon: 'content_copy',
                                auth: false
                            },
                            {
                                action: 'delete',
                                icon: 'remove_circle_outline',
                                auth: true
                            },
                            {
                                action: 'hide',
                                icon: 'flip_to_back',
                                state: false
                            }
                        ]
                    },
                    {
                        name: 'room',
                        icon: 'settings_applications',
                        auth: true,
                        actions: [
                            {
                                action: 'open',
                                icon: 'accessibility',
                                auth: false
                            },
                            {
                                action: 'profile',
                                icon: 'person',
                                auth: false
                            },
                            {
                                action: 'settings',
                                icon: 'settings',
                                state: false
                            }
                        ]
                    }
                ]
            },
            map: {
                default_sets: {
                    lat: 46.43192571103273,
                    lng: 30.742602070500197,
                    zoom: 18,
                    iconUrl: '../../assets/img/icons/mapGPS/center_32.png'
                }
            }
        },
        dev: {
            mode: 1
        }
    };
}
