import config from '@/config';
const api = config.api;
export default [
    {
        'code': 200,
        'method': 'GET',
        'url': api.transactions.transaction,
        'params': {
            'page': 1,
            'size': 5,
            'sort_by': 'created_at'
        },
        'status': 'OK',
        'data': [
            {
                'id': 1,
                'category': 'parking',
                'date': '2019-05-06T12:06:00.000Z',
                'title': 'Parkir Tanggal 20',
                'price': 25000
            },
            {
                'id': 2,
                'category': 'fuel',
                'date': '2019-05-06T12:06:00.000Z',
                'title': 'Bensin PP Thamrin - GI',
                'price': 25000
            },
            {
                'id': 3,
                'category': 'parking',
                'date': '2019-05-06T12:06:00.000Z',
                'title': 'Parkir Tanggal 20',
                'price': 25000
            },
            {
                'id': 4,
                'category': 'fuel',
                'date': '2019-05-06T12:06:00.000Z',
                'title': 'Bensin PP Thamrin - GI',
                'price': 25000
            },
            {
                'id': 5,
                'category': 'parking',
                'date': '2019-05-06T12:06:00.000Z',
                'title': 'Parkir Tanggal 20',
                'price': 25000
            }
        ],
        'paging': {
            'pageNumber': 1,
            'pageSize': 5,
            'totalPage': 2,
            'totalRecords': 10
        }
    },
    {
        'code': 200,
        'method': 'GET',
        'url': api.transactions.transaction,
        'params': {
            'page': 2,
            'size': 5,
            'sort_by': 'created_at'
        },
        'status': 'OK',
        'data': [
            {
                'id': 6,
                'category': 'fuel',
                'date': '2019-05-06T12:06:00.000Z',
                'title': 'Bensin PP Jakarta - Bandung',
                'price': 25000
            },
            {
                'id': 7,
                'category': 'fuel',
                'date': '2019-05-06T12:06:00.000Z',
                'title': 'Bensin Town Hall',
                'price': 25000
            },
            {
                'id': 8,
                'category': 'parking',
                'date': '2019-05-06T12:06:00.000Z',
                'title': 'Parkir Bus Mini',
                'price': 25000
            },
            {
                'id': 9,
                'category': 'parking',
                'date': '2019-05-06T12:06:00.000Z',
                'title': 'Parkir Motor GI',
                'price': 25000
            },
            {
                'id': 10,
                'category': 'parking',
                'date': '2019-05-06T12:06:00.000Z',
                'title': 'Parkir Tanggal 6',
                'price': 25000
            }
        ],
        'paging': {
            'pageNumber': 1,
            'pageSize': 5,
            'totalPage': 2,
            'totalRecords': 10
        }
    },
    // {
    //     'code': 200,
    //     'method': 'POST',
    //     'url': api.transactions.transaction,
    //     'status': 'OK',
    //     'data': {
    //         'id': 500000026,
    //         'image': 'https://blogiin.files.wordpress.com/2016/03/struk-spbu.png?w=259&h=379',
    //         'location': 'Graha Niaga Thamrin',
    //         'category': 'PARKING',
    //         'license': 'BL 6728 POW',
    //         'vehicle': 'Motorcycle',
    //         'in': '2018-05-12T17:19:06.151Z',
    //         'out': '2018-05-12T17:19:06.151Z',
    //         'price': 9000,
    //         'created_at': '01:12:2007 03:06:10z',
    //         'modified_at': '',
    //     }
    // },
    {
        'code': 200,
        'method': 'POST',
        'url': api.transactions.transaction,
        'status': 'OK',
        'data': {
            'id': 500000026,
            'image': 'https://blogiin.files.wordpress.com/2016/03/struk-spbu.png?w=259&h=379',
            'category': 'FUEL',
            'date': '2018-05-12T17:19:06.151Z',
            'type': 'Premium',
            'volume': 5.00,
            'unitPrice': 9000,
            'created_at': '2018-05-12T17:19:06.151Z',
            'modified_at': '',
        }
    },
    {
        'code': 200,
        'method': 'PUT',
        'url': api.transactions.transaction,
        'status': 'OK',
        'data': {
            'id': 500000026,
            'image': 'https://blogiin.files.wordpress.com/2016/03/struk-spbu.png?w=259&h=379',
            'location': 'Graha Niaga Thamrin',
            'category': 'PARKING',
            'license': 'BL 6728 POW',
            'vehicle': 'Motor',
            'in': '2018-05-12T17:19:06.151Z',
            'out': '2018-05-12T17:19:06.151Z',
            'price': 9000,
            'created_at': '2018-05-12T17:19:06.151Z',
            'modified_at': '2018-05-12T17:19:06.151Z',
        }
    },
    // {
    //     'code': 200,
    //     'method': 'PUT',
    //     'url': api.transactions.transaction,
    //     'status': 'OK',
    //     'data': {
    //         'id': 500000026,
    //         'title': 'Blibli Future Program',
    //         'image': 'https://blogiin.files.wordpress.com/2016/03/struk-spbu.png?w=259&h=379',
    //         'category': 'FUEL',
    //         'type': 'premium',
    //         'volume': 5.00,
    //         'price': 9000,
    //         'created_at': '2018-05-12T17:19:06.151Z',
    //         'modified_at': '2018-05-12T17:19:06.151Z',
    //     }
    // },
    {
        'code': 200,
        'method': 'GET',
        'url': api.transactions.transaction + '/1',
        'status': 'OK',
        'data': {
            'id': 2,
            'category': 'FUEL',
            'title': 'Bensin PP untuk TownHall',
            'date': '2018-05-12T17:19:06.151Z',
            'image': 'https://i.ibb.co/CH1BZGh/0-214a0b28-8817-4f97-9f18-8933fb3a4b92-700-1045.jpg',
            'unitPrice': 90000,
            'volume': 23.5,
            'type': 'Premium',
            'created_at': '2018-05-12T17:19:06.151Z',
            'modified_at': '2018-05-12T17:19:06.151Z'
        }
    },
    {
        'code': 200,
        'method': 'GET',
        'url': api.transactions.transaction + '/2',
        'status': 'OK',
        'data': {
            'id': 1,
            'title': 'Parkir Tanggal 20',
            'image': 'https://i.ibb.co/b58ysN8/S-12108046.jpg',
            'location': 'Graha Niaga Thamrin',
            'category': 'PARKING',
            'license': 'BL 6728 POW',
            'vehicle': 'Motor',
            'in': '2018-05-12T17:19:06.151Z',
            'out': '2018-05-12T17:19:06.151Z',
            'price': 9000,
            'created_at': '2018-05-12T17:19:06.151Z',
            'modified_at': '2018-05-12T17:19:06.151Z',
        }
    },
    {
        'code': 200,
        'method': 'GET',
        'url': api.users.user,
        'params': {
            'page': 1,
            'size': 10,
            'sort_by': 'created_at',
            'search': ''
        },
        'status': 'OK',
        'data': [
            {
                'id': 1559058600,
                'username': 'Hefriza Munaf',
                'role': 'ADMIN',
                'created_at': 1559058410
            },
            {
                'id': 1559058601,
                'username': 'Munawan Sadakh',
                'role': 'ADMIN',
                'created_at': 1559054600
            },
            {
                'id': 1559058602,
                'username': 'Wahyu Negoro',
                'role': 'MEMBER',
                'created_at': 1559158600
            },
            {
                'id': 1559058603,
                'username': 'Ilham Safir',
                'role': 'ADMIN',
                'created_at': 1552058600
            },
            {
                'id': 1559058604,
                'username': 'Liana Tan',
                'role': 'MEMBER',
                'created_at': 1589058600
            }, {
                'id': 1559058605,
                'username': 'Stefani Gwen',
                'role': 'ADMIN',
                'created_at': 1519058600
            },
            {
                'id': 1559058607,
                'username': 'Dave Choi',
                'role': 'MEMBER',
                'created_at': 1549058600
            },
            {
                'id': 1559058609,
                'username': 'Tiana Citra',
                'role': 'ADMIN',
                'created_at': 1552058600
            },
            {
                'id': 1559058610,
                'username': 'Sam Willow',
                'role': 'MEMBER',
                'created_at': 1551058600
            },
            {
                'id': 1559058611,
                'username': 'Ben Kheng',
                'role': 'MEMBER',
                'created_at': 1558058600
            }
        ],
        'paging': {
            'pageNumber': 1,
            'pageSize': 10,
            'totalPage': 2,
            'totalRecords': 20
        }
    },
    {
        'code': 200,
        'method': 'GET',
        'url': api.users.user,
        'params': {
            'page': 2,
            'size': 10,
            'sort_by': 'created_at',
            'search': ''
        },
        'status': 'OK',
        'data': [
            {
                'id': 1559058611,
                'username': 'Maureen Owlzad',
                'role': 'ADMIN',
                'created_at': 1559058410
            },
            {
                'id': 1559058612,
                'username': 'Munawan Sadakh',
                'role': 'ADMIN',
                'created_at': 1559054600
            },
            {
                'id': 1559058613,
                'username': 'Wahyu Negoro',
                'role': 'MEMBER',
                'created_at': 1559158600
            },
            {
                'id': 1559058114,
                'username': 'Ilham Safir',
                'role': 'ADMIN',
                'created_at': 1552058600
            },
            {
                'id': 1559058115,
                'username': 'Stelli Tan',
                'role': 'MEMBER',
                'created_at': 1589058600
            }, {
                'id': 1559058615,
                'username': 'Stefani Gwen',
                'role': 'ADMIN',
                'created_at': 1519058600
            },
            {
                'id': 1559058617,
                'username': 'Dave Choi',
                'role': 'MEMBER',
                'created_at': 1549058600
            },
            {
                'id': 1559058619,
                'username': 'Jen Kim',
                'role': 'ADMIN',
                'created_at': 1552058600
            },
            {
                'id': 1559058620,
                'username': 'Willy Hans',
                'role': 'MEMBER',
                'created_at': 1551058600
            },
            {
                'id': 1559058621,
                'username': 'Leo Philip',
                'role': 'MEMBER',
                'created_at': 1558058600
            }
        ],
        'paging': {
            'pageNumber': 2,
            'pageSize': 10,
            'totalPage': 2,
            'totalRecords': 20
        }
    },
    {
        'code': 200,
        'method': 'POST',
        'url': api.users.user,
        'status': 'OK',
        'data':
        {
            'id': 1559058611,
            'username': 'Maureen Owlzad',
            'role': 'ADMIN',
            'created_at': 1559058410
        }

    },
    {
        'code': 200,
        'method': 'GET',
        'url': api.users.user,
        'params': {
            'page': 1,
            'size': 10,
            'sort_by': 'created_at',
            'search': 'ste'
        },
        'status': 'OK',
        'data': [
            {
                'id': 1559058115,
                'username': 'Stelli Tan',
                'role': 'MEMBER',
                'created_at': 1589058600
            },
            {
                'id': 1559058615,
                'username': 'Stefani Gwen',
                'role': 'ADMIN',
                'created_at': 1519058600
            },
            {
                'id': 1559058617,
                'username': 'Steffi Kim',
                'role': 'MEMBER',
                'created_at': 1549058600
            },
            {
                'id': 1559058619,
                'username': 'Stella Kim',
                'role': 'ADMIN',
                'created_at': 1552058600
            }
        ],
        'paging': {
            'pageNumber': 1,
            'pageSize': 10,
            'totalPage': 1,
            'totalRecords': 4
        }
    },
    {
        'code': 200,
        'method': 'GET',
        'url': api.users.user + '/1559058600',
        'status': 'OK',
        'data':
        {
            'id': 1559058600,
            'username': 'Hefriza Munaf',
            'password': 'Test123',
            'role': 'ADMIN',
            'created_at': 1559058410
        }
    },
    {
        'code': 200,
        'method': 'PUT',
        'url': api.users.user + '/1559058600',
        'status': 'OK',
        'data':
        {
            'id': 1559058600,
            'username': 'Hefriza Munaf',
            'password': 'Test123',
            'role': 'ADMIN',
            'updated_at': 1559058410
        }
    }

];