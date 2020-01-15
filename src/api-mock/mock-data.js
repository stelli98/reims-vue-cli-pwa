import config from "@/config";
const api = config.api;
export default [
  //login
  {
    code: 200,
    method: "POST",
    url: api.auth.login,
    headers: {
      authorization: "Bearer 123"
    },
    status: "OK",
    data:{
      id: "1", 
      username: "ADMIN", 
      role: "ADMIN"
    }
  },
  //get transaction fuel category first page 
  {
    code: 200,
    method: "GET",
    url: api.transactions.transaction,
    headers: {
      authorization: "Bearer 123"
    },
    params: {
      page: 1,
      size: 5,
      sortBy: "createdAt",
      category: "FUEL"
    },
    status: "OK",
    data: [
      {
        id: 1,
        category: "fuel",
        date: "2019-05-06T12:06:00.000Z",
        title: "Fuel1 Tanggal 20",
        amount: 25000
      },
      {
        id: 2,
        category: "fuel",
        date: "2019-05-06T12:06:00.000Z",
        title: "Bensin PP Thamrin - GI",
        amount: 25000
      },
      {
        id: 3,
        category: "fuel",
        date: "2019-05-06T12:06:00.000Z",
        title: "Fuel Tanggal 20",
        amount: 25000
      },
      {
        id: 4,
        category: "fuel",
        date: "2019-05-06T12:06:00.000Z",
        title: "Bensin PP Thamrin - GI",
        amount: 25000
      },
      {
        id: 5,
        category: "fuel",
        date: "2019-05-06T12:06:00.000Z",
        title: "Fuel Tanggal 20",
        amount: 25000
      }
    ],
    paging: {
      pageNumber: 1,
      pageSize: 5,
      totalPages: 2,
      totalRecords: 10
    }
  },
  //get transaction fuel category second page 
  {
    code: 200,
    method: "GET",
    url: api.transactions.transaction,
    params: {
      page: 2,
      size: 5,
      sortBy: "createdAt",
      category: "FUEL"
    },
    status: "OK",
    data: [
      {
        id: 6,
        category: "fuel",
        date: "2019-05-06T12:06:00.000Z",
        title: "Fuel Page 2 PP Jakarta - Bandung",
        amount: 25000
      },
      {
        id: 7,
        category: "fuel",
        date: "2019-05-06T12:06:00.000Z",
        title: "Bensin Town Hall",
        amount: 25000
      },
      {
        id: 8,
        category: "fuel",
        date: "2019-05-06T12:06:00.000Z",
        title: "Fuel Bus Mini",
        amount: 25000
      },
      {
        id: 9,
        category: "fuel",
        date: "2019-05-06T12:06:00.000Z",
        title: "Fuel Motor GI",
        amount: 25000
      }
    ],
    paging: {
      pageNumber: 2,
      pageSize: 5,
      totalPages: 2,
      totalRecords: 9
    }
  },
  //get transaction parking first page 
  {
    code: 200,
    method: "GET",
    url: api.transactions.transaction,
    headers: {
      authorization: "Bearer 123"
    },
    params: {
      page: 1,
      size: 5,
      sortBy: "createdAt",
      category: "PARKING"
    },
    status: "OK",
    data: [
      {
        id: 11,
        category: "parking",
        date: "2019-05-06T12:06:00.000Z",
        title: "Parkir Tanggal 20",
        amount: 25000
      },
      {
        id: 12,
        category: "parking",
        date: "2019-05-06T12:06:00.000Z",
        title: "Parkir Tanggal 21",
        amount: 25000
      },
      {
        id: 13,
        category: "parking",
        date: "2019-05-06T12:06:00.000Z",
        title: "Parkir Tanggal 22",
        amount: 25000
      }
    ],
    paging: {
      pageNumber: 1,
      pageSize: 5,
      totalPages: 1,
      totalRecords: 3
    }
  },
  //get transaction medical first page 
  {
    code: 200,
    method: "GET",
    url: api.transactions.medical,
    headers: {
      authorization: "Bearer 123"
    },
    params: {
      page: 1,
      size: 5,
      sortBy: "createdAt",
      category: "MEDICAL"
    },
    status: "OK",
    data: [
      {
        id: 14,
        category: "medical",
        date: "2019-05-06T12:06:00.000Z",
        title: "Obat Tanggal 20",
        amount: 25000
      },
      {
        id: 15,
        category: "medical",
        date: "2019-05-06T12:06:00.000Z",
        title: "Medical Tanggal 20",
        amount: 25000
      },
      {
        id: 16,
        category: "medical",
        date: "2019-05-06T12:06:00.000Z",
        title: "Obat Tanggal 20",
        amount: 25000
      },
      {
        id: 17,
        category: "medical",
        date: "2019-05-06T12:06:00.000Z",
        title: "Medical Tanggal 20",
        amount: 25000
      }
    ],
    paging: {
      pageNumber: 1,
      pageSize: 5,
      totalPages: 1,
      totalRecords: 3
    }
  },
  //filter and sort
  {
    code: 200,
    method: "GET",
    url: api.transactions.transaction,
    params: {
      page: 1,
      size: 5,
      sortBy: "title",
      search: "Parkir",
      category: "",
      startDate: "",
      endDate: ""
    },
    status: "OK",
    data: [
      {
        id: 1,
        category: "parking",
        date: "2019-05-06T12:06:00.000Z",
        title: "Parkir Tanggal 20",
        amount: 25000
      },
      {
        id: 3,
        category: "parking",
        date: "2019-05-06T12:06:00.000Z",
        title: "Parkir Tanggal 20",
        amount: 25000
      },
      {
        id: 5,
        category: "parking",
        date: "2019-05-06T12:06:00.000Z",
        title: "Parkir Tanggal 20",
        amount: 25000
      }
    ],
    paging: {
      pageNumber: 1,
      pageSize: 5,
      totalPages: 1,
      totalRecords: 3
    }
  },
  //create transaction
  {
    code: 200,
    method: "POST",
    url: api.transactions.transaction,
    status: "OK",
    data: {
      id: 500000026,
      title: "",
      image:
        "https://blogiin.files.wordpress.com/2016/03/struk-spbu.png?w=259&h=379",
      category: "FUEL",
      date: "2018-05-12T17:19:06.151Z",
      type: "Premium",
      liters: 5.0,
      amount: 9000,
      created_at: "2018-05-12T17:19:06.151Z",
      modified_at: ""
    }
  },
  // save transaction
  {
    code: 200,
    method: "PUT",
    url: api.transactions.transaction,
    status: "OK",
    data: {
      id: 500000026,
      image:
        "https://blogiin.files.wordpress.com/2016/03/struk-spbu.png?w=259&h=379",
      location: "Graha Niaga Thamrin",
      category: "PARKING",
      license: "BL 6728 POW",
      type: "Motor",
      in: "2018-05-12T17:19:06.151Z",
      out: "2018-05-12T17:19:06.151Z",
      amount: 9000,
      created_at: "2018-05-12T17:19:06.151Z",
      modified_at: "2018-05-12T17:19:06.151Z"
    }
  },
  //get fuel detail with id 1
  {
    code: 200,
    method: "GET",
    url: api.transactions.transaction + "/1",
    status: "OK",
    data: {
      id: 2,
      category: "FUEL",
      title: "Bensin PP untuk TownHall",
      date: "2018-05-12T17:19:06.151Z",
      image: "3278/12345abc.png",
      amount: 9000,
      liters: 1.5,
      type: "Premium",
      created_at: "2018-05-12T17:19:06.151Z",
      modified_at: "2018-05-12T17:19:06.151Z"
    }
  },
  //get parking detail with id 11
  {
    code: 200,
    method: "GET",
    url: api.transactions.transaction + "/11",
    status: "OK",
    data: {
      id: 1,
      title: "Parkir Tanggal 20",
      image: "/3278/12345abc.png",
      location: "Graha Niaga Thamrin",
      category: "PARKING",
      license: "BL 6728 POW",
      type: "Motor",
      in: "2018-05-12T17:19:06.151Z",
      out: "2018-05-12T17:19:06.151Z",
      amount: 9000,
      created_at: "2018-05-12T17:19:06.151Z",
      modified_at: "2018-05-12T17:19:06.151Z"
    }
  },
  //get transaction image
  {
    code: 200,
    method: "GET",
    url: api.transactions.transaction + "/3278/12345abc",
    status: "OK",
    data: {
      image:
        "aVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQVNVQUFBSERDQU1BQUFCVnBQemFBQUFCS1ZCTVZFWC8vLzhBQVAvLy8vMW1BUC8vL2Y1bXR2K1FPdjg2a1AvYi8vOEFPdisyWnY4QkFQei8vL3YvL3Z3QVp2L2JrUC8vMi84NkFQK1EyLysyLy8vL3R2OCtQdjRBQVBaVlZ2d0FBTzYydHY1dGJkdS93TzU1ZXVUbTUveTB0T3B4Yi9jMU4vdGlZdmoxOVBuejhmenQ3UHdYR09LWG1QVDA4L3ZZMlBUTzBQbHZiK25pNVAwQUFlblB6ZnkwdGZZMU0vQkFRK0FqSS9XcHF2ekp4djA1Ty9LUmovQW1KZGxVVk9ncUsvVlhXT1JKU2QzVDFmdUlodWN4TXVSTlQvS0lodlJCUWUxMGRQb2pJK1dOa1A5L2Z2V2VuL0krUE51ZG5lY0FBTnlmbXY1dWIrNTFkdXlvcS9LK3Z2emUzZjlmWHZxTGkrRktTLzJwcWQ4ZElQczJPT05mWHQ2aHBmK2FtZW5kNGUxOWV2dG5adDIwdCtSblovMFJFTlo4ZnRWNmZPR0hodGFWbE03RHc5K0toSWdRQUFBZFhFbEVRVlI0bk8yZGlVUGJPUGJISlZXbHV5T254MHdyektUaFNBSUpKQnlCY0ExWFNxRUg1M1JvcCswT3U3Ty8vZi8vaU4rVGZFaytJRUJNUXZvK0xYRWl5N0wwdGZUMDlHd0NJUWlDSUFpQ0lBaUNJQWlDSUFpQ0lBaUNJQWlDSUFpQ0lBaHlmM0JDbUhxeEVweSsxWWI1YjVqNno4SjBxQkRqQ2dJLy9qNm9ObWZxUFNUQ1A3M0pxVlpjMVlCSDFXR0FVYnQ3aDVFQzRaVXk1dzVjcTZnZVhIL3dQM05mRWdaVlo1WGkzdWpvZ3BlYUc0NVhOWU9DdmpwOTVPdWliQjFYZFZleDByMEV4cnozOE1hcHJXeS9reDgrYkxTYUV3N2pMTGUrVkhDWTFWTzUvOU0vbkhWMy9lMWNzMVZuQlY2d2R6R2xnK05yVjU3ZDI1MTJtNThQeHN2Y09YUVB1WC9GODBGZEEzUEE2WlAxVFNqR0p0eFQ1MnkydnJoZjFtTXFqckpNVG5uKzkxMFgrdERyOFJJcGNGWW1aS3BWSUtiaDZESEY4VGdWbnA4WnZKNjZlMWg3dDdiemJrR3VXdVl5TkF1cy9uRjlXcnFmMzR4VlZjOHFWMWFXVmptYmJSWnp2TFo4dk9rMlhZc2xwNS9tKy90RlpmKzR3aWZtNWxyRUdFTk1hY0RLVysvWEx6NDBONDRYemxRbEMyZnZOMXUvZnFRVFlEa3V2dWRhNTFWSktSVTBRaHc1K1hYZGE5azRQdDZFMDQvOU51ODJMTFBrMUdjMjkyVno3ZkxrbStvMHZFTHFPMUlLTWJkTUo4QzBqaTQ2cEpCYnRUblpGRW9sclJOczRMK2NpYzI4OTRCeUFGUnR1UHk0MDRBZWRMcFVoakhrT1NWUWxiT1R6ZFlIdC9WbCtjeFJDaEgrdXRYNldHeEt1ckZRWFJaVGNPU2hXOG5UZXBOeVcxSkxLQ3FMeW9YTDB4cW13RUFteDJtSWd3NWNIMmZsSFhmUFp6NHEzcjQ5V3BQTi9mUDNkVlVwcDF5RW1rM0lmZEdzTC93aE9vU01pWFBRclNGUEdjdXJ2Z3dtMWxKTGRTR2xrTlJxVVhGUktzQTE0L21kTmdsNGtZM1YwY2xXYzNXWGdRY3crNDV2U0FDcUpPakY1dUdXbzExSlJsYW1tN09rNGJiTHY2OHdzaVhiaEMySVhWWEE5QndwWEhlUzI5Y09oQ2k2Z1V6VWYvTlpUY0wzNlZ1Q1NLZnVoOFZQYjRyRnRscU56TDhqMVVhakJGU3IxYklhWk9CQkx1Mk1rd05LOTBBZHNiTjVBaXFKU1U2S2Nra055Nm1XazF0OXdhZUV3bWVrTmtuQ2swbXg2ZS9NNjd4eDRHSzFKMHZLc0RUQVVTcXcrYy82SXVuLytucnhiZWhYOUJYcHVPNUdnYmVscEJMNmxHZ3hQaXQyd050a3k3S2FuNFh3ZlA0SkxWSXcwOEVXdkJWMnI4NGw0Ni9PdWZaeGQxYmc0OG83NXEvQ2xRVlhyVCtnbDdPeVZaYWJ2OGt0VXZqamRVdk1rSks0WUtRKy9VVU54Nm83bGx0MUM2cXZjMUx1Nk9uTkgyOVNUWFNuNnNMZW0xMkNidnRxMUZFckpySzZ6bGxoYklub3hheWFScGlqNnJFcUR1cWlYUktITTJLdlBQT1JmQWR6WFpVWG5OZSs2VFU2YVYzeXZDWTVWYTdxMXRXV043MzUvMENzaTNxT3k4Y0VjS3BYbytwMHp2eFI4MytFTEgrMmVqSm9OU011cEx0d0luWW42VTdkbFYva1JwbVUzemRnbXRIYWNISTAzVHZybmU1WE16YnZldTVBNkZ2U3hiTGhwbW56cGE0MUQyMVZ3WHVqRjU5NmljN1VwT2d0T2d0cVllb2R6QjNWSGVDZmNzQWN4K3Vma05HeEY1Q2NnVXFFbkhUV05rK3FoRlQyRitDRXpQUFpsSi9OLzZUdXUwUG5Fbm81RlZ2clFueHVRUGJhNVdaWWgxUFo2TmxGZGJqVlJWUlR1Rzdkb1RCOWNHV2tkc3RtR0t6cVRUYUVWYW9lak9ra2RTWExYa3FsV2lORWJaVTVLVlNxU3F4YXRjYWRtdDROcllhakNJZFBVSXVhVGpHdTA2dFI2QTlyaDFXaVhmK0YvWm9mWFBNdVMyRlpqTUtPRGZkOVk3MjVVRHVkTGI5ZjN5eWR5UTBscGg2U1ZmZDlyMGFjdDh3MlN3dG1mRDR6WWZJR2Z1cEd0L3ZYTkxBMlYzWU9wMXZxN2ZRT2VhODIrNzl0RVRiYjhoTy9lb2xiQlZMWW5ONVgxL2JMOVA3VzdMN2UrUm9HeGZRNHJ5KzJwcGZJQWlUOHU4aWplaW03ZExCWTlSU0Q5TjIvbFJPcERiZHlNOEY1SEdXazFGeGt2UEt0ekVsaEY3eXA5WW83cVh1dnlsVllQTytsZ1RDRFczcGc2UENrSHpNSjBtSEpZTVoxZWRQcllwdGsxTzl4THR2MGV0OTBsY3hUZjdodXMzVmwxR0NDTE1PblpZZVZYZGpNZVAxenc0RkNkc215eWxxYlVDbmZ6YXYxYXBUdG4wRzNMcWpnS1hIR1duTW5zMVd2S2lyUXRDREJLYTh1bEFqYm16emk1RVRzemEvL3dadXZWQ1VMZXNoL3YraVpZU3B3WFltd2JwNWt6UE5Nb2hIbWRhL0lBZUdyTGRydXJBbTV0YklvTmpxZGpyeHdUaGZwUnVlekt3NzR2R2k5YzBWblVhenkweVh3NU5laFpVZUNnczJZaDZWV3FiSGJ1UkNmTzRkcys0SzZwZXI2aFpoZzg3c2JnblppS3EwMWduT0NreTNBODI3OWRyQmNMK2dMdVRWUjVNNjNZcFhWWEhwUlp0OXA1K0JqamJVK2FadWhlMXl4V2UrUlNFeUhSWXNKVkVYK1NvU2F5cEZLN0ZqVUhYNGtYck5UY2Vnd3ArMVdlQkhlT1F0aWtjeUxiYWNqblZtNnpia3pJV0IrSms1RFV0anNDZkZkbWY1MVVWT1dlNDZLUGVKTWlRbzA2a2hTV0tFR0YwK05PRFoxNFBkZnFNMjg5QzNraDQzUjM0dHE4RmFPSjV2dWRHM1dsWEtCbkVBbkZUdmswem56d3J3d3U1VGx4eDZwcElENlNSR2hsa3ViVUxzOWFTUGtYTlMzR1B1Vm5uR25LbmI1cVhqUFpubEhsc2s0T0hhTUxFcWxFaVJBeDlrR0M5SzZXSmV6bkowcDc5anBDUEZHZGN4elVWVXo5cHlBY1VlbVpBbGtuR3h1aXBXd1VweUE5Wjc1b3UrUHFEc0RaRVhxdFFBNDJWUlZjZWRmdFdKVHdNSjhmc1o5TGFkWTRmQjhSOUQ2WDE5MURKcHBnOXRlNzVsR01KdEpHbU1Sek9HQ0ZGYVlpZEtPWWNBNE9SWm5jRG5sSnpJbVQwanpaSy9qRkpSS0JGYWxzRWpZWmgzSjV1bHFBVllONjh2aUl3R1ZwSGhiZG9YOHJvd3JxS1NtaVRuUmtrVitMa3VFbEdUbkwraFl3WlZUS3BIdE9YLzRRSnRYOVR5N3NiQUM1dS9pTjVmS1J0MWRkRWJweXBUN3paVzFXckhpYklqUzdvY3lXQzN1M2REb2RPNHFqbDdpYTRkbDFyWDhJclhtQnRlajNnd1h1NzdmMUtwdzAwNzlxbFJhRVplZzBzRXlmYTBVSEJlSHpOa1RiVkp0THJDMjVLWG1BbkdXNVdySmhWWDZtZXcwZDR0aVNiNVJQWEZkVkpWWWMvUllUREhkbHhia1FRV1c5TjRNcTJvR0t1MXQ2c3VvdmJNalZRdTNEbk5JdTlVZ1d4ZnlyT0cyRGwxWjJwQXpyaWdleU4wWjJXWTdhNzdEUUp6U29RcU0zUkYxS2RWcVJNZEpJcjlJVldXY3M4cWl0OHoxQTNIdzRtNlpzeUVEdTFTc0ZqZm9lMzRLbzBDOFZxWmdYRTZlTDBwNUNCcVh5U2RaNXVDdTgwczV6eTVhaEovSmljbldwdmhkdkZIRFlaMnFLRFdiRTdPdVd3YVZIT2liSzJRZmptSGFkMlVPMkNWZTN6OWh3YjIydDZwQ241U1pPcG1CRWxibDFqY3dBbkFKZEQzUGkyQ2Q5dXVrNUNoTFcvL3JZSFQvZzl3czMxVWpOY1VxdDROM2hMQmNiQ3BtWUNKZDk4WHhnM0ZnRDVhWnFSTDBKUkJIUWdjakMycS9VZ242a2lwaWwrcysxNUUxU0hLY2pXYlpHUlZiNU16OWZpeWt1eUxmcU40Q2ZVbTUzWE9pZWlsT0ptREVzVVg1elptUUsxN2hZQllMeXZkZTJGYzJTWmYzVWFsMHdPdG43SnVLZHMzSythb1VmOWVkQmJxeC9WVk1sOGYvSGxjRGRXdjU5ZEtGdXA4eTlYWDJ6azZsZGsvVi9jaWpLQ3pweTdRSnJ0S0JETVphRUVKNXpSMXJGY2VQd2M3VFpwR3BxTmNiK3F0VFVDTk9jY0wwZlU2bEVtd2FVcTZ0TmNWWFhwZHZpbURiR2pEaUNweWYwNm9TODBoVVowVUhWT0xRNUxXMWx0aHpsSzNXdGhmbU9GSmRVNU8rbnJYZXFPSC92ZHBzVmIvVjF6ZlpsbGlwdVJKMG1YQVhDRit1UStlckgxNSsvcmNycHQ4ZC9UbGJjWG9Sd3ZDZkJsQ1dXMWcyV3JScnBIQVN4SFJGWUpkMjlRMUNvd0RuVjlIKzlHVVdpbEhXMjEydGJWYlpxZHc3T3hJYlhqOVhreDV3NG1sOUR0WjdvZ3oydXlFbmxIRTdweFdsNVJ4dGtBMnhJVXRzWE9vVDd1b0FuTElGT2laUTNkL3o3bk94MHJRS25MYS91VzcxL1g5Y1VWMFFwMUJjaWJPRDdiTFRtUC82WlVOKytIRHg2ZStUcllvREZvOEh5NG83QTlVcHVuNmdMVlNwQlo3SVZqTWNiLzZ1L1FxeDEzdUVIZE9HNTNzdWdDR2FLWTI1WTlvVEtFekNpMXJOZHR5YUdvVkhkTzN6em81N0FTTnVncmZkclRQVmx6eFBBUHJzSEV3Qk1IbTVKWFlnOW5XK2luY09hQ0NvVk9CYnJjTnZhdHlTaVFuVjYrWEo2VXFwMWY1eVVHN1RCY2VkcmloQjk5YWF0TG0yZmpCZThuM2Y0UEdQTzBmaEhMMEFMN1Zvb0ljL3dZRmhjR29iL2x3WHBycDFQMDVvekhHdlJWV1hBL1BjQ1JSMUlwYkJxMXlHcGJqWTV5b2NBSjZBQ3FtQ1grQVVuQ241clFyeUZMK0NjL2xkSFRRbGRJRGpXRlJZQ1diMUVtbTc1WUlEbnR1V1BvMWFJdW1ZUU9IdGxIY3AzTDBEVmRXTC8vejNRb2lsLy90TjBCTStYOVdXZFhMajYwcERINklDRkdwQnczVEZldENWVk0vZ0hmOCtTUmlVMUc3aExvMGkzbnFLQTlkV0J6VzRjWGRndmkzZXZDMUNDMHFYWXZUdDI3MXpPUWFHZUJTbS9qYjlYaVVyYjF2aVlKbVRHWEd4N0pENVQrSnlWVTcrQ1c3SEc5R3Uxajd1YllqdmIyZFp0U1BlekxOZDZsWlBYSG5JbmRsZGNlNzFVQmcwV2lXeU1qMVQvMVk4YW40NE9GQ1hyZlBYM3VYVTVadXZ4U2I5ay9scnE4bExiOFoydkVsSkhlVkZOVzl0bDRKbXF0a1cxZzZtMVZiL0pvaGVjSmx1SmlSdko4dHg5cFdPKzFDeEtmOUdnamo5VmExNVM3QjZGVE5PU3lXNWpUTXdKbkplZlFKVFQ5MVpzZ1B2dHBlOWE5QXVIRVBwbjJHSjQvN1BCUWVrU01CN0ZuUGNEMWw1S3ZIaTB2N2ltcGo4dzFOSktOZUFjOTV3NlV5Z3crVFViZFc0UWlVL2pFWFVQUUJUREtoNHUremYydzMzcUJYTGxKTnlWWFpVTzNmZ3pYZC9McFJqMjlDSVpwV1RDM0hpVEtvUjY1WWFTcVV0c3VpdExOdzZXWUx5dmk3b213OTBsKzFKRlJUZ0xmbS9wdEtRTFVHaDI5cmhEVldDVDVWcVE3NzYzNnBXU1NrTmZRaXNJbDFsL2ozbjNxdWtsZEw5MFNuYUN4T2hMYmRUL3Z2WEdLOXJMT1V1YVdNTWFNRFZyQzJNZVpUSzhBN01DcHMvNVFXOWU1NnhlWGpWbVUvVk83Q0VZMk1MWlg2cUQ2Z1NkV3lWRkdiSHlsdGpZeXZNZ2IxaktveW4vVEpmSlRVVmxPUmt0VEhoOWNDTGViaG1zUFNGQmJVZjI4eEhKYUtIY2N6blZ1YW5xSmJwM2tRYzVzd3lndDd3ajJLdzNHK1EvdUFGUUwzbitaai9NSmIvbkJGVEFTT1ZYT0JCMFNxWVMveFBUQy9DU05pWGxFRm1ZT0JGcStVL3Z5RGM0N0hWSmxSM0w2aGtEaXJwaWlreGJKOWJEWm1aNEtFNysvbkYxT2VYQ3Q0Rkx4UjBmSnVyd3dxTWVkWlVUMUg2L3IwLzBVUjZjUDFCUjlVY0w0MEhGVkl5Y2gwRjlKOE05UHFTcmt4SitoZlNtM3E5bDlmQlpKSkhYL0llMVhUc08yN0t1azRZVHltYStYbnF2Uk1XT2dZRmJTalVKZmNDTzM3ci9RWTZJQ1QzaHF3T2Y0WVArQ2xwOUUwQ1BYczYvaDFKSS9TblZkTG5McFJjY3g3Mk44ZkIxY3hseE9ublNXZGtmR0hTVnJGLzVnMk11TFZPdTdIbHFhM25YKzgrbVhjMzBkSFBvS21oNStqWXFuWmZHUGY2cUw1TFFMemdEek51ZytwRmlDN0kwZjBvNmt0S0pVZTVWSUdQRzk0bEZFZEJUWEpReVpzWFR1TUxFOW9xa2VDMms5bVRRazg0aVhkTGlSZTg1bXBOSEdibTlydVQ5OUVKVTN4Yng3MjdVZEN0dlNweDdwdHQ3aC9qVzIvdC9ibzB1S1BqcjVtRWlnLzc1ak9mdnNSSm8yWE5ibXFDTFdxTDBOOEhUVzJDT1E0QWxSS0lkdEFYZTYrU284eHR1VzJGU21Ed3dWS01tY0gvUWVBYWxhak1jWTVUcHZhTDlVQ2dOOGFkZTM2STYzcXU2MHV5UWZMeWw5UzRYNDNGdVlYbytJOTFENVJNVjZxa2hzQzR2emVYRmNxSmZxRE1wRlhWVTNtdnozVkhydTVMWU1EZnNyeXNOMHk1Ly8xWGZBMHlHNFd6ZTMyK08zQ05Tb0tlczl6V2Nkb3ZjWXlQWElXQi9QUGQ0M09UMTNPZFhZSzFkbTZlQVBQOHUvQ2pEaHA1SzZ6OEhvKytGZGVOT1BtaGxxUHYvU0RnNnNrY29oOTdnNTVla3RFZEwrKy9PLzNwK0M4OU1qaWJ2Qnl3MmZuZTBIRnZ2UUJVWGJ3OHN5UmxFTWVTY3ZITDZrclp1OWtDK1FxVFU0TTI4ZHdiNmg2Szl3dU1uc1U4KzczZGhDN1VhaC8vVWE4UjdmYjV3WnJDeGxTZXZ6QTR5QlM4dmhTR0h0UjlsUHJlWHJITTlGcGFtMUNtdzNDY2JWejI3UmRtK3cxM1huMEtWc3BlNk1aYkozc1JhUjNpQytKVEZ4TS9hRmRTSERUTGVxbFEwQkU2THpEcUpJS2tqTlRrekErckVtTU50ek5mTGRkcVpmaFhxVlRncFFiLzRhVldycWlFbW5xcFZCcm56ZEtQT3VKVUZPZDBXbnlZdmhiWlBPbjNyeGIzRFJYNTVMV3g3ZGN4L3JZMmlzTkdQMyt2dU04a3c2YVpERm93NHg3cDBwM21WNFNjZnhCKzVMWWpDSUlnQ05KWFJpaDlvbC9wWXhKdEg4SExULy84Ujc4ck55aU0wRjllZ2t3alQ4Z3pyWmEvdFZWNnBKVXp0OEJUUWw3Q0JqSTlmNkVPSWVFMnpEYzBhRG1lS25XMEtzSFdVZ2xhLzlqYzZyMTYrMFQvUEhzOG90VUp0bUcrb2NHWFF6WHZtYS9TczdoS3o1NTZzZ1RiUUtYbkx6eUpkUmZVK0dvRitZYUdibFFhZWV5MU90aGVwMUtZYjJqdzIzT1ZTczlmL0tKekJkdG94Q21TS2tYNWhvWkhYdnNzbFo3YTFocys2MVlIMit0VWl2SU5EYzg4UTJ1b3BNZVJxUktrNlZZSFc5aDdTU2tOaEVtb0ZPVWJIcDVwQjBrMTc5RlR6MTlTelRaVWV2N2laLzB4MkJJdlo3alhGMUNqdGthK1lVSjFweEhQODlITkhMRkhYR0NtZ3EyUHQvZjVDNldwcFZJczM5RGcrMHVLRk9zOTRqdVp3VFk0U08xOS9pTEtFMnhqK1lZRzN4TlFKRlZTQTBoOURMYkdRVUZQc2xTSzV4c0tESDlKa1ZUcHBYcUZqOEUyUU8yTlBLcm84SGkrb2VCYWxaNTV6MUg5RW15Tmd5SXhqTVBOZkVQRHRTcUZ1WXp0VlNwWitZY0ZQYUU5c1pxcFBZS25vY09wTUZXQ24yQ3ZwVkpnNGMzOFE4TWo3UUtFS3ZuK2twOGNackpWQ3ZiNkVaU1hlb2c5ZXZ6U0dwSUlnaUFJZ2lESWp3V0ZmMm1wMGF1UjRpY3JqRmN2UGZ6eGtveTBJQ1U2MXRnUUk2dDlObXJzMWRYTVBtZnUzRUlsczNhQkR2RTBTNlZrMGZFc3FTcVplM3lWTXMrWk02aFNOM1NwRXJWcWxGREoyMC9qRWdUSmlhS3Q4cE9ad3BTclZMTE9tVE8zVjhteUVWZXFaTmlsSU4wN21JUkhCd2RST3lXdVV1WTVjNlpibFdoQ3BlQ2QvNThTMHhoMzNaZUN3K3krbEREUHNiNlVPR2VPcEptTmFJOVo4NkE5OWtlekNFcnRadGxDeEl1T0hSeXJoWmtlNWFWWG5UTkg3UHJGNjNremxWS2FaZWUwaW80NnhWMVVJdmVpRWpGOWw2NVVNbjBoMzdSMG9WS1dYZkkwOGc4Mm5hb3d4U3lJWG5WT0JFRVFCTEd3RnZkaFNrcXUxTmZVOHFLOTF1eG1wa2NIbStmUGpnLzBuK3ZkbTVSNU42c2gxbDQ3ZWtJdGx5dmhZWmhaTXdydkovbXBaSHVnUDRoSzNydDQ5dlFDcldJc3o5cmVwSnpmZExFSEI5dUpUclZMWVVNczJ4THV0ZjFxWTIrS1NnbVJyUFBINHdPRFExcGZ5c2hDVTdLbjUwNFpTSEhkMHM4ZjJQQ0hxNUl4QWQzRUxrV2RKVTJraEVyVytCd1lzbFNLRDRxVXBtUVZsdHJuTWtTeU02YkdCd1lCd3k0WTFpazJLaEkzUGJyMmx5eVZyTHNuaWZObnhRY1FCRUVRQkVFUUJFRVFCRUVRQkVFUUJFRVFCRUVRQkVFUTVPRmhQMnJVMVJIeEozUGl2MlJ6M2VsU0MwcC9rdEIrQUNqNVdNL1ZUd24xanBzcEZCNWdIaFovL084MkJmbnRqRCtmYVQ2RUZ6c2d2UzQ1UWFsUm4vRFMrTmNzclFLWktrVkhlVTlwMlFJWXAwa3RLS0dTdVlkYUNmMVd5VGhwWmdVU1R3S21YbW1yT0U5NjY1andVRXNsNjBIQjFFRk1yWlJrWFhLQ3htcmF2VXFXWGNvZUQvYXYrOUo0V2RlcVpGc3lPeWthQkRkcjlJMjV0VXJVU2lIVzcwREd4a09XU2pUNWsxQXBzeWZibjNMdlM4bWFkbUdYc3BwekU1WE1EdWQzaWVTdnJTYkxOblprWHNwZWs2S1M4WnJzT0ViTnpKVHNFWmVwVWtyVFUwNlVsYlhmS3RuTlRmbXQ1N2pYUW1QcFlaTHhlSEthQ29uZjlvcnRKeVRldTZ5c1VVcGZubmxPbnJvUGxVQVFCRUVRQkJrSTZJOUZ2K1ZHRUFSQjdwZnM0QXhOeEV6Q0EyNXprZ2NkV2NqOEhvaGtUREpLNzZiYzJEbEkvc0hwSFBGVlNub1RmakF1NkZIMGlsQjRhcm5KRHc5WkpVSXptbTdGZHExUTVvMmJPOFFxSmNMek5NeCs4NU5FcncrU01EQ2Qwb2pZM1lKdzZOM21KS2tuZURCa3FtUlo3NXYzcFdHelM2WkpUdDdvU1ZHcHErWU9vMG9wTjNIc2J4UU1VbTUzOSt2QnE0UWdDSUlndzBwWEUvc2RRK3NQUHpEZjFUZG8zc0pIU3ZxbkR4a3pjaEw0akZHd0pNaEU0cG1DaUVwbTY0ZE1KU01tWU1VSGtnOFZKek4xSDBVWldwWE1UTlI4Q3RlU3Nydm1QM0NSckpoQXRrcmg2KzM2MGtNWEtUZVZrb2MvWkxKTXpuVXFCV093QzVVZXZrajI5RVZvK0Q2dE14aVp3cFF1TlBoeG4yVDRNVnVOSUFpQ1BEamlFMVppQXZPOUkyT2RjcVBpc3gyQmh6UlZkaGs1c1cvZGRWL21FTVFFRkZGUXhQclRFL0hJU1JoUDZjWkhUS3JrSFJkR1hLaXhpOUR1L05PK0V1OG1WZ09pOXpkU3lTbytDc1ZFaWxsbnN4ejZBU1ZUcFRDRFpaZHUyaHhxTEhrZXRrcld6ZTJyUjl6TlZUSTIxSmI2b2FnVUNVQmlLaGx2N202OWcwMzQvcUdxMUsxZEluZFY2UUgySmZQUmt1d1JkemQveWR5RXR4Nk02MEhwd0t1RUlBaUNJRU9LNlJJTitGUWMxYzVZbGQvUC9SbWErYUdINWZhbXhOaUNLZkVWYWpsaXVkZjJ3OHQzZTJicHpqVkxsSml4Y0xvUGtpUE92RklEaE9HYTA3Nk51S1JLK1ovN1JwZ3FwZnprZlhKamF3YzNCZ3F6Um5GMStxSlNUMDdkNjVxYkR4c01pa3AzNzBzNTFOd0s2Tnp6aUxQaXJZbGYwQmtrTEtNUWY0OFlvQ0lJZ2lEZGdoYXpHMy9EdUswU3Z0em9GRDJackJPM2RPN3o2Mkd2VnlrdVRYZVZpaDF3NTVZa2ZlM2dqdFY5K2Q1aEJDQjhMTVNNQ1JncTNTQzhrbERwcnI4OWxuaC8veXJSUUlGNFNzcnJqY01yUFdrT1RZeTRlMVVwdkc5TDRnSjBvMUszcDdqenVJdVB1QnZla0w4amRsOUtwTmdSQW12MTFIVjRoUkxTVzVVSTZiOUs0VmRRWEttU21aeFZidndVUTZWU1dzcU5SMXltOWI1bGsyamk1LzVWSXJIZVk2Y1FXNldiaGxlaTVrUWwzYUtpaVdqSlBmcEwyZlhwZGFrNWxJa2dDSUlnQ0pJL3ovU0M3RW5xdnBHTTlKc3lBbWQ0M0pPUytzZnpGejluN1JycGtVcFA0R0xjb3Fqbkw3d3IrRkp0ZnZIUy9QZEJrcmtyVnl5VmJGMTZweEw1NlovL3VOM0JqeDZUUjNEOHlGUC9vL2MrU0RKMzVjcjlxUFRzMWlyOXJJUUtWZmJmQjBubXJsd1piSldlVC81amtGUjZSQ21jVFJuYW40TVBkMUhwa1dHdWZaVkdub3hrelJQWnZIeEtCa2dsZjVCN3VvUWp2cmNxZ2Y3UGJtcHFuejBaSkpYODAzbTZCT2Z1cmZWV201YzNWV25rNXg5SXBSRndtRzZoMGtzOXpRK29Tb3BlcXVUNU5MZnFTODlmUEI1WWxaUkgzdE8rcElxL2xVcmtwNmVEcXRKUFlHZDdPK0tnclVPblV1L3RrbElIVmJvU0tFYWQ1T1lxNlhyOFFDcnBlZTdocStRN2tqL3BWanhTUStSdUtxWDYzdkRXYjFsM1FPN25MNTZFVHE2ZUFuenYxMWpwUHVyTnRid2FhNFdpWm0zbElkT25xbVBkZkVFUkVsZnBKZjE1eEk5eWRLK1NxdFNUcUc3NndPQzl0d20zUTBPUHh1K1FneW9oQ0lJZ3lJQkJmeXo2TGZkUTArK0xlOC8wVzI0RVFSQUVRUkFFUVJBRVFSQUVRUkFrZjd5QWNQU3EwMkkvUVZZektTVnJVRnhhZXZTSG9PeHZGckMvTnlRV25FNFVucXpUdldGOGRVZkdUNVF4VmNTc2hwaGZoR0orODBLbVN2SDJweForNVRkaTVFZUdTalR4L2RtNXFCUjhnOU9EVnNuOFV5N2hYek16YXA2aEVnMWVvaEVYdmtTSFV2TmlHQm1NWTh5dkVVa1dlbzlFRnNFMkttR2x3b3hCSTJNdE5zMUpwa3JtYVVoVVR2UkhkaDZDU2xHdGlLMFNOZHZwN1RXL3ZpcXJMd1YvL3pwbHdJYU50djc0VjlvWDZoZ0ZHUWYwNS92Wk0wWWNpWTJ0b0puMmpuU1Z3bGVhVExkUEZ2WTl1NWhFUVdiSzBLbVVrbjUzbGZvMzRrS0RjYlZLUnJ1dThwZlNEamI4SmVOa21TcVpmNFVzNVFBRVFSQUV1UllhVGo1ZHpuVFJwRWhJYkg2TGZ6YUxUazBQZDhkbnRDQWxlYkwra09XWFhLY1NTVkVsOWZQVnZsTktwbXlIYktCVU1xSUJ3ZFdOTHpWdXJoSk45OE9IVmlYemUxRlRGcU8zVW9uUStBR3gvZjFXS2NVdXhhOWtmSEYvbFVwbWZNQ3lTMGFNTXNVdVdkY2tIbkVhQUpXQ1Z4cTl2MFlsd3hxbkxkblQrNUtwVXBoT3JOUEd4cHJadndaR3BXakVKWDZzR3FhYmtMU3NhV1ltZnJLTTRnYlJMcUZLMTJFMU1lRXZKWWVSa1RYdE1FdU5ydndsRWcxZFlscXFnZktYRUFSQmtJZEk5cnhQWTNtaTJTZzlDQjFiM0p2dnFUMWx4WTZLMWtOWndmVGd2VkhKNU9TYko1WkM5RXFWYUxLdVYvaFI5bUhKMDFpbHAvcEdzYUxqWjQ1ZnBUeDVFQ29GUzJVYWZ1aVBTalI0b2ZHMmtrZ0FtbFRKbHBKWVI1cUhCV1BRT0UzYWdYWmR3aHhobElMMlM2Vm96WDRMbGF6RzJ2WXFybExpTkdicEtTclpSWnVkMXkrTnhydDhqZ1ExTSsvQmUxclFoRW9rYmx6amZTbGpaUmN0ZXpLZUg3QUtOZlFNYy9nRlJERVkrNkRjaVRVdUZuK0w1VW1xbE94d1Y2a1VLeWc2TUZab2F0R1paN2dINHFlK1VpVnl0VW9aSXk1ZEs2c0d3NkJTTERKQWswbGVTalJjd21XL01Zd1NwekZxUUlJUkZSUERyR09LU3RhRFF3aUNJQWlDSUFpQ0lBaUNJQWlDSUFpQ0lBaUNJQWlDSUFpQ0lBaUNJQWlDSUFpQ0lBaUNJQWlDSUFpQ0lBaUNJQWlDSUFpQ0lBaUNJQWlDSUFpQ0lBaUNJQWlDSUFpQ0lBaUNJQWlDSUVncS93Ky9LQ01yTytYM0xnQUFBQUJKUlU1RXJrSmdnZz09"
    }
  },
  // get list of user on first page 
  {
    code: 200,
    method: "GET",
    url: api.admin.user,
    params: {
      page: 1,
      size: 10,
      sort_by: "createdAt",
      search: ""
    },
    status: "OK",
    data: [
      {
        id: 1559058600,
        username: "Hefriza Munaf",
        role: "ADMIN",
        created_at: 1559058410
      },
      {
        id: 1559058601,
        username: "Munawan Sadakh",
        role: "ADMIN",
        created_at: 1559054600
      },
      {
        id: 1559058602,
        username: "Wahyu Negoro",
        role: "MEMBER",
        created_at: 1559158600
      },
      {
        id: 1559058603,
        username: "Ilham Safir",
        role: "ADMIN",
        created_at: 1552058600
      },
      {
        id: 1559058604,
        username: "Liana Tan",
        role: "MEMBER",
        created_at: 1589058600
      },
      {
        id: 1559058605,
        username: "Stefani Gwen",
        role: "ADMIN",
        created_at: 1519058600
      },
      {
        id: 1559058607,
        username: "Dave Choi",
        role: "MEMBER",
        created_at: 1549058600
      },
      {
        id: 1559058609,
        username: "Tiana Citra",
        role: "ADMIN",
        created_at: 1552058600
      },
      {
        id: 1559058610,
        username: "Sam Willow",
        role: "MEMBER",
        created_at: 1551058600
      },
      {
        id: 1559058611,
        username: "Ben Kheng",
        role: "MEMBER",
        created_at: 1558058600
      }
    ],
    paging: {
      pageNumber: 1,
      pageSize: 10,
      totalPages: 2,
      totalRecords: 20
    }
  },
  // get list of user on second page 
  {
    code: 200,
    method: "GET",
    url: api.admin.user,
    params: {
      page: 2,
      size: 10,
      sort_by: "createdAt",
      search: ""
    },
    status: "OK",
    data: [
      {
        id: 1559058611,
        username: "Maureen Owlzad",
        role: "ADMIN",
        created_at: 1559058410
      },
      {
        id: 1559058612,
        username: "Munawan Sadakh",
        role: "ADMIN",
        created_at: 1559054600
      },
      {
        id: 1559058613,
        username: "Wahyu Negoro",
        role: "MEMBER",
        created_at: 1559158600
      },
      {
        id: 1559058114,
        username: "Ilham Safir",
        role: "ADMIN",
        created_at: 1552058600
      },
      {
        id: 1559058115,
        username: "Stelli Tan",
        role: "MEMBER",
        created_at: 1589058600
      },
      {
        id: 1559058615,
        username: "Stefani Gwen",
        role: "ADMIN",
        created_at: 1519058600
      },
      {
        id: 1559058617,
        username: "Dave Choi",
        role: "MEMBER",
        created_at: 1549058600
      },
      {
        id: 1559058619,
        username: "Jen Kim",
        role: "ADMIN",
        created_at: 1552058600
      },
      {
        id: 1559058620,
        username: "Willy Hans",
        role: "MEMBER",
        created_at: 1551058600
      },
      {
        id: 1559058621,
        username: "Leo Philip",
        role: "MEMBER",
        created_at: 1558058600
      }
    ],
    paging: {
      pageNumber: 2,
      pageSize: 10,
      totalPages: 2,
      totalRecords: 20
    }
  },
  //create user 
  {
    code: 200,
    method: "POST",
    url: api.users.user,
    status: "OK",
    data: {
      id: 1559058611,
      username: "Maureen Owlzad",
      role: "ADMIN",
      gender: "FEMALE", 
      division: "FINANCE", 
      dateOfBirth: "898362000000", 
      license: "", 
      vehicle: "",
      created_at: 1559058410
    }
  },
  //get list of user after search 'ste'
  {
    code: 200,
    method: "GET",
    url: api.admin.user,
    params: {
      page: 1,
      size: 10,
      sort_by: "createdAt",
      search: "ste"
    },
    status: "OK",
    data: [
      {
        id: 1559058115,
        username: "Stelli Tan",
        role: "MEMBER",
        created_at: 1589058600
      },
      {
        id: 1559058615,
        username: "Stefani Gwen",
        role: "ADMIN",
        created_at: 1519058600
      },
      {
        id: 1559058617,
        username: "Steffi Kim",
        role: "MEMBER",
        created_at: 1549058600
      },
      {
        id: 1559058619,
        username: "Stella Kim",
        role: "ADMIN",
        created_at: 1552058600
      }
    ],
    paging: {
      pageNumber: 1,
      pageSize: 10,
      totalPages: 1,
      totalRecords: 4
    }
  },
  //get details of user personal
  {
    code: 200,
    method: "GET",
    url: api.admin.user + "/1559058600",
    status: "OK",
    data: {
      id: 1559058600,
      username: "Munawan Sadakh",
      gender: "MALE",
      dateOfBirth: "2019-05-06T12:06:00.000Z",
      role: "ADMIN",
      division: "TECHNOLOGY",
      license: "BL 123 AA",
      vehicle: "Avanza Silver White",
      created_at: 1559058410
    }
  },
  //get user family detail from user with id 1559058600 [ADMIN]
  {
    code: 200,
    method: "GET",
    url: api.admin.family + "?user-id=1559058600",
    status: "OK",
    data: [
      {
        id: 92768,
        name: "Zendaya",
        relationship: "SPOUSE",
        dateOfBirth: "898362000000"
      },
      {
        id: 92761,
        name: "Andre Forbes",
        relationship: "CHILDREN",
        dateOfBirth: "898362000000"
      }
    ],
    success: true
  },
  //get user family detail from login user
  {
    code: 200,
    method: "GET",
    url: api.users.family,
    status: "OK",
    data: [
      {
        id: 92768,
        name: "Zendaya",
        relationship: "SPOUSE",
        dateOfBirth: "898362000000"
      },
      {
        id: 92761,
        name: "Andre Forbes",
        relationship: "CHILDREN",
        dateOfBirth: "898362000000"
      }
    ],
    success: true
  },
  // get detail of user family
  {
    code: 200,
    method: "GET",
    url: api.admin.family + "/92768",
    status: "OK",
    data: {
      id: 92768,
      name: "Zendaya",
      relationship: "SPOUSE",
      dateOfBirth: "898362000000"
    }
  },
  // get detail of user family
  {
    code: 200,
    method: "GET",
    url: api.users.family + "/92768",
    status: "OK",
    data: {
      id: 92768,
      name: "Zendaya",
      relationship: "SPOUSE",
      dateOfBirth: "898362000000"
    }
  },
  // edit user personal
  {
    code: 200,
    method: "PUT",
    url: api.admin.user + "/1559058600",
    status: "OK",
    data: {
      id: 1559058600,
      username: "Munawan Sadakh",
      gender: "MALE",
      dateOfBirth: "2019-05-06T12:06:00.000Z",
      role: "ADMIN",
      division: "TECHNOLOGY",
      license: "BL 123 AA",
      vehicle: "Avanza White",
      updated_at: 1559058410
    }
  },
  //create medical response
  {
    code: 200,
    method: "POST",
    url: api.transactions.medical,
    status: "OK",
    data: [
      {
        title: "Istri Demam",
        date: "2020-01-01",
        amount: 1000000,
        attachment: [
          "92769/lqeigbhqohjgpoq313019504185.jpg",
          "92769/1gr2hbo23gbfo12332r5m5.jpg"
        ],
        patient: {
          id: 92768,
          name: "Zendaya",
          relationship: "SPOUSE",
          dateOfBirth: "1979-02-06"
        }
      }
    ]
  },
  //get medical response
  {
    code: 200,
    method: "GET",
    url: api.transactions.medical + "/14",
    status: "OK",
    data: {
      id: 14,
      title: "Istri Demam",
      date: "1576971908000",
      amount: 1000000,
      age: 29,
      attachment: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRwlfgmNM7rxcWw425O5AJC29oLx1VoxXUZzdfZgSW9H52L6Qb7",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRwlfgmNM7rxcWw425O5AJC29oLx1VoxXUZzdfZgSW9H52L6Qb7"
      ],
      patient: {
        id: 92768,
        name: "Zendaya",
        relationship: "SPOUSE",
        dateOfBirth: "898362000000"
      }
    }
  }
];
