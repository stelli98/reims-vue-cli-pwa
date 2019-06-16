import config from '@/config';
const api = config.api;
export default [
    {
        'code': 200,
        'method': 'GET',
        'url': api.transactions.transaction,
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
                'title': 'Bensin PP untuk Town Hall',
                'price': 25000
            },

        ],
        'paging': {
            'pageNumber': 2,
            'pageSize': 10,
            'totalPage': 3,
            'totalRecords': 28
        }
    },
    {
        'code': 200,
        'method': 'GET',
        'url': api.transactions.requestImageOCR,
        'status': 'OK',
        'data': {
            'id': 500000026,
            'image': 'https://blogiin.files.wordpress.com/2016/03/struk-spbu.png?w=259&h=379',
            'location': 'Graha Niaga Thamrin',
            'category': 'PARKING',
            'license': 'BL 6728 POW',
            'vehicle': 'Motorcycle',
            'in': '2018-05-12T17:19:06.151Z',
            'out': '2018-05-12T17:19:06.151Z',
            'price': 9000,
            'created_at': '01:12:2007 03:06:10z',
            'modified_at': '',
        }
    },
    {
        'code': 200,
        'method': 'GET',
        'url': api.transactions.requestImageOCR,
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
        'method': 'POST',
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
    {
        'code': 200,
        'method': 'POST',
        'url': api.transactions.transaction,
        'status': 'OK',
        'data': {
            'id': 500000026,
            'title': 'Blibli Future Program',
            'image': 'https://blogiin.files.wordpress.com/2016/03/struk-spbu.png?w=259&h=379',
            'category': 'FUEL',
            'type': 'premium',
            'volume': 5.00,
            'price': 9000,
            'created_at': '2018-05-12T17:19:06.151Z',
            'modified_at': '2018-05-12T17:19:06.151Z',
        }
    },
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
    }
];