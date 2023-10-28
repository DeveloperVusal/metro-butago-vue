import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useStationsStore = defineStore('stations', () => {
    const lines = ref([])
    const stations = ref([])
    const colors = ref({})
    const dropdown = ref([])
    const isActiveDropdown = ref(false)
    const times = ref({})

    times.value = {
        short: 3,
        long: 4,
        transfer: 3,
        shortTransfer: 1
    }

    colors.value = {
        1: '#04AC5F',
        2: '#EF1923',
        3: '#91147C',
        4: '#04AC5F',
    }

    lines.value = [
        {id: 1, name: 'Yaşıl xətt'},
        {id: 2, name: 'Qırmızı xətt'},
        {id: 3, name: 'Bənövşəyi xətt'},
        {id: 4, name: 'Yaşıl xətt (məkik hərəkət)'}
    ]

    stations.value = [
        // Yaşıl xətt
        {
            id: 1,
            name: 'Dərnəgül',
            line_id: 1,
            move: [2],
            graph: {2: times.value.short},
            view: {
                point: {
                    x: 422.108,
                    y: 183.108
                },
                text: {
                    x: 422.108,
                    y: 173.273
                },
                render: 'line1_1',
            }
        },
        {
            id: 2,
            name: 'Azadlıq prospekti',
            line_id: 1,
            move: [3, 1],
            graph: {3: times.value.short, 1: times.value.short},
            view: {
                point: {
                    x: 341.108,
                    y: 183.108
                },
                text: {
                    x: 307,
                    y: 173.273
                },
                render: 'line1_2',
            }
        },
        {
            id: 3,
            name: 'Nəsimi',
            line_id: 1,
            move: [4, 2],
            graph: {4: times.value.short, 2: times.value.short},
            view: {
                point: {
                    x: 245.108,
                    y: 183.108
                },
                text: {
                    x: 229,
                    y: 173.273
                },
                render: 'line1_3',
            }
        },
        {
            id: 4,
            name: 'Memar Əcəmi',
            line_id: 1,
            move: [5, 3, 36],
            graph: {5: times.value.short, 3: times.value.short, 36: times.value.transfer},
            transfer: [ 36 ],
            view: {
                point: {
                    x: 183.846,
                    y: 282.646
                },
                text: {
                    x: 195,
                    y: 279.273
                },
                render: 'line1_4',
                transfer: ['line3_36']
            }
        },
        {
            id: 5,
            name: '20 Yanvar',
            line_id: 1,
            move: [6, 4],
            graph: {6: times.value.short, 4: times.value.short},
            view: {
                point: {
                    x: 184.108,
                    y: 309.108
                },
                text: {
                    x: 132,
                    y: 311.773
                },
                render: 'line1_5',
            }
        },
        {
            id: 6,
            name: 'İnşaatçılar',
            line_id: 1,
            move: [7, 5],
            graph: {7: times.value.short, 5: times.value.short},
            view: {
                point: {
                    x: 184.108,
                    y: 341.108
                },
                text: {
                    x: 130,
                    y: 343.773
                },
                render: 'line1_6',
            }
        },
        {
            id: 7,
            name: 'Elmlər Akademiyası',
            line_id: 1,
            move: [8, 6],
            graph: {8: times.value.long, 6: times.value.short},
            view: {
                point: {
                    x: 187.759,
                    y: 404.926
                },
                text: {
                    x: 95,
                    y: 406.773
                },
                render: 'line1_7',
            }
        },
        {
            id: 8,
            name: 'Nizami',
            line_id: 1,
            move: [9, 7],
            graph: {9: times.value.long, 7: times.value.long},
            view: {
                point: {
                    x: 263.108,
                    y: 429.108
                },
                text: {
                    x: 266,
                    y: 443.773
                },
                render: 'line1_8',
            }
        },
        // {
        //     id: 9,
        //     name: '28 May',
        //     line_id: 1,
        //     move: [10, 8, 34, 22],
        //     graph: {10: times.value.short, 8: times.value.long, 34: times.value.transfer, 22: times.value.transfer},
        //     transfer: [ 22, 34 ],
        //     view: {
        //         point: {
        //             x: 320,
        //             y: 409
        //         },
        //         text: {
        //             x: 281,
        //             y: 396
        //         },
        //         render: 'line1_9',
        //         transfer: ['line2_22', 'line2_22-line4_34'],
        //     }
        // },
        // {
        //     id: 10,
        //     name: 'Gənclik',
        //     line_id: 1,
        //     move: [11, 9, 23],
        //     graph: {11: times.value.short, 9: times.value.short, 23: times.value.shortTransfer},
        //     transfer: [ 23 ],
        //     view: {
        //         point: {
        //             x: 396,
        //             y: 333
        //         },
        //         text: {
        //             x: 409,
        //             y: 351
        //         },
        //         render: 'line1_10',
        //     }
        // },
        // {
        //     id: 11,
        //     name: 'Nariman Narimanov',
        //     line_id: 1,
        //     move: [12, 13, 10, 24],
        //     graph: {12: times.value.short, 13: times.value.short, 10: times.value.short, 24: times.value.shortTransfer},
        //     transfer: [ 24 ],
        //     view: {
        //         point: {
        //             x: 457,
        //             y: 272
        //         },
        //         text: {
        //             x: 470,
        //             y: 290
        //         },
        //         render: 'line1_11',
        //         transfer: ['line2_24'],
        //     }
        // },
        // {
        //     id: 12,
        //     name: 'Bakmil',
        //     line_id: 1,
        //     move: [11, 25],
        //     graph: {11: times.value.short, 25: times.value.shortTransfer},
        //     transfer: [ 25 ],
        //     view: {
        //         point: {
        //             x: 468,
        //             y: 218
        //         },
        //         text: {
        //             x: 430,
        //             y: 212
        //         },
        //         render: 'line1_12',
        //     }
        // },

        // Qırmızı xətt
        {
            id: 20,
            name: 'İçərişəhər',
            line_id: 2,
            move: [21],
            graph: {21: times.value.short},
            view: {
                point: {
                    x: 239.108,
                    y: 562.108
                },
                text: {
                    x: 185,
                    y: 564.773
                },
                render: 'line2_20',
            }
        },
        {
            id: 21,
            name: 'Sahil',
            line_id: 2,
            move: [22, 20],
            graph: {22: times.value.short, 20: times.value.short},
            view: {
                point: {
                    x: 300.033,
                    y: 501.108
                },
                text: {
                    x: 269,
                    y: 500.273
                },
                render: 'line2_21',
            }
        },
        {
            id: 22,
            name: '28 May',
            line_id: 2,
            move: [23, 21, 34, 9],
            graph: {23: times.value.short, 21: times.value.short, 34: times.value.transfer, 9: times.value.shortTransfer},
            transfer: [ 34, 9 ],
            view: {
                point: {
                    x: 380.535,
                    y: 421.855
                },
                text: {
                    x: 338,
                    y: 416.773
                },
                render: 'line2_22',
                transfer: ['line4_34', 'line1_9']
            }
        },
        {
            id: 23,
            name: 'Gənclik',
            line_id: 2,
            move: [24, 22, 10],
            graph: {24: times.value.short, 22: times.value.short, 10: times.value.shortTransfer},
            transfer: [ 10 ],
            view: {
                point: {
                    x: 459.8,
                    y: 342.855
                },
                text: {
                    x: 466,
                    y: 351.773
                },
                render: 'line2_23',
            }
        },
        {
            id: 24,
            name: 'Nariman Narimanov',
            line_id: 2,
            move: [25, 26, 23],
            graph: {25: times.value.short, 26: times.value.short, 23: times.value.short, 11: times.value.shortTransfer},
            transfer: [ 11 ],
            view: {
                point: {
                    x: 515.136,
                    y: 288.108
                },
                text: {
                    x: 420,
                    y: 284.773
                },
                render: 'line2_24',
                transfer: ['line1_11']
            }
        },
        {
            id: 25,
            name: 'Bakmil',
            line_id: 2,
            move: [24, 26],
            graph: {24: times.value.short, 26: times.value.short},
            view: {
                point: {
                    x: 518.124,
                    y: 230.761
                },
                text: {
                    x: 483,
                    y: 226.773
                },
                render: 'line2_25',
            }
        },
        {
            id: 26,
            name: 'Ulduz',
            line_id: 2,
            move: [27, 24, 25],
            graph: {27: times.value.short, 24: times.value.short, 25: times.value.short},
            view: {
                point: {
                    x: 582.108,
                    y: 224.108
                },
                text: {
                    x: 590,
                    y: 234.773
                },
                render: 'line2_26',
            }
        },
        {
            id: 27,
            name: 'Koroğlu',
            line_id: 2,
            move: [28, 26],
            graph: {28: times.value.short, 26: times.value.short},
            view: {
                point: {
                    x: 623.9,
                    y: 192.9
                },
                text: {
                    x: 606,
                    y: 182.773
                },
                render: 'line2_27',
            }
        },
        {
            id: 28,
            name: 'Qara Qarayev',
            line_id: 2,
            move: [29, 27],
            graph: {29: times.value.short, 27: times.value.short},
            view: {
                point: {
                    x: 680.899,
                    y: 237.9
                },
                text: {
                    x: 687,
                    y: 235.773
                },
                render: 'line2_28',
            }
        },
        {
            id: 29,
            name: 'Neftçilər',
            line_id: 2,
            move: [30, 28],
            graph: {30: times.value.short, 28: times.value.short},
            view: {
                point: {
                    x: 716.9,
                    y: 271.9
                },
                text: {
                    x: 724,
                    y: 266.773
                },
                render: 'line2_29',
            }
        },
        {
            id: 30,
            name: 'Xalqlar Dostluğu',
            line_id: 2,
            move: [31, 29],
            graph: {31: times.value.short, 29: times.value.short},
            view: {
                point: {
                    x: 745.9,
                    y: 298.9
                },
                text: {
                    x: 756,
                    y: 295.773
                },
                render: 'line2_30',
            }
        },
        {
            id: 31,
            name: 'Əhmədli',
            line_id: 2,
            move: [32, 30],
            graph: {32: times.value.short, 30: times.value.short},
            view: {
                point: {
                    x: 776.9,
                    y: 328.9
                },
                text: {
                    x: 783,
                    y: 324.773
                },
                render: 'line2_31',
            }
        },
        {
            id: 32,
            name: 'Həzi Aslanov',
            line_id: 2,
            move: [31],
            graph: {31: times.value.short},
            view: {
                point: {
                    x: 808.309,
                    y: 359.071
                },
                text: {
                    x: 813.999,
                    y: 355.773
                },
                render: 'line2_32',
            }
        },

        // Yaşıl xətt (məkik hərəkət)
        {
            id: 33,
            name: 'Şah İsmayıl Xətai',
            line_id: 4,
            move: [34],
            graph: {34: times.value.short},
            view: {
                point: {
                    x: 508.109,
                    y: 429.111
                },
                text: {
                    x: 497,
                    y: 445.773
                },
                render: 'line4_33',
            }
        },
        {
            id: 34,
            name: 'Cəfər Cabbarlı',
            line_id: 4,
            move: [33, 9, 22],
            graph: {33: times.value.short, 9: times.value.transfer, 22: times.value.transfer},
            transfer: [ 9, 22 ],
            view: {
                point: {
                    x: 373.108,
                    y: 429.109
                },
                text: {
                    x: 373,
                    y: 445.773
                },
                render: 'line4_34',
                transfer: ['line2_22', 'line1_9-line2_22']
            }
        },

        // Bənövşəyi xətt
        {
            id: 35,
            name: 'Avtovağzal',
            line_id: 3,
            move: [36],
            graph: {36: times.value.short},
            view: {
                point: {
                    x: 128.748,
                    y: 224.916
                },
                text: {
                    x: 69,
                    y: 229.773
                },
                render: 'line3_35',
            }
        },
        {
            id: 36,
            name: 'Memar Əcəmi',
            line_id: 3,
            move: [35, 37, 4],
            graph: {35: times.value.short, 37: times.value.short, 4: times.value.transfer},
            transfer: [ 4 ],
            view: {
                point: {
                    x: 177.878,
                    y: 275.878
                },
                text: {
                    x: 195,
                    y: 279.273
                },
                render: 'line3_36',
                transfer: ['line1_4']
            }
        },
        {
            id: 37,
            name: '8 Noyabr',
            line_id: 3,
            move: [36],
            graph: {36: times.value.short},
            view: {
                point: {
                    x: 240.374,
                    y: 339.853
                },
                text: {
                    x: 244,
                    y: 329.773
                },
                render: 'line3_37',
            }
        },
        {
            id: 38,
            name: 'Xocəsən',
            line_id: 3,
            move: [37],
            graph: {37: times.value.short},
            view: {
                point: {
                    x: 88.0904,
                    y: 183.751
                },
                text: {
                    x: 93.1846,
                    y: 179.854
                },
                render: 'line3_38',
            }
        },
    ]

    const getDropdown = computed(() => dropdown.value)

    const setDropdown = (payload) => {
        dropdown.value = payload
    }

    const getIsActiveDropdown = computed(() => isActiveDropdown.value)

    const setIsActiveDropdown = (value) => {
        setTimeout(() => {
            isActiveDropdown.value = value
        }, 0)
    }

    return { 
        lines, 
        colors, 
        stations, 
        getIsActiveDropdown, setIsActiveDropdown, 
        getDropdown, setDropdown
    }
})