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
        transfer: 2.5,
        shortTransfer: 1.3
    }

    colors.value = {
        1: '#04AC5F',
        2: '#EF1923',
        3: '#91147C',
        4: '#8AAC04',
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
                    x: 368,
                    y: 178
                },
                text: {
                    x: 346,
                    y: 168
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
                    x: 287,
                    y: 178
                },
                text: {
                    x: 246,
                    y: 168
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
                    x: 192,
                    y: 178
                },
                text: {
                    x: 176,
                    y: 168
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
                    x: 131,
                    y: 227
                },
                text: {
                    x: 142,
                    y: 225
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
                    x: 131,
                    y: 288
                },
                text: {
                    x: 76,
                    y: 291
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
                    x: 131,
                    y: 339
                },
                text: {
                    x: 74,
                    y: 342
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
                    x: 136,
                    y: 402
                },
                text: {
                    x: 31,
                    y: 404
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
                    x: 208,
                    y: 422
                },
                text: {
                    x: 191,
                    y: 439
                },
                render: 'line1_8',
            }
        },
        {
            id: 9,
            name: '28 May',
            line_id: 1,
            move: [10, 8, 34, 22],
            graph: {10: times.value.short, 8: times.value.long, 34: times.value.transfer, 22: times.value.transfer},
            transfer: [ 22, 34 ],
            view: {
                point: {
                    x: 320,
                    y: 409
                },
                text: {
                    x: 281,
                    y: 396
                },
                render: 'line1_9',
                transfer: ['line2_22', 'line2_22-line4_34'],
            }
        },
        {
            id: 10,
            name: 'Gənclik',
            line_id: 1,
            move: [11, 9, 23],
            graph: {11: times.value.short, 9: times.value.short, 23: times.value.shortTransfer},
            view: {
                point: {
                    x: 396,
                    y: 333
                },
                text: {
                    x: 409,
                    y: 351
                },
                render: 'line1_10',
            }
        },
        {
            id: 11,
            name: 'Nariman Narimanov',
            line_id: 1,
            move: [12, 13, 10, 24],
            graph: {12: times.value.short, 13: times.value.short, 10: times.value.short, 24: times.value.shortTransfer},
            transfer: [ 24 ],
            view: {
                point: {
                    x: 457,
                    y: 272
                },
                text: {
                    x: 470,
                    y: 290
                },
                render: 'line1_11',
                transfer: ['line2_24'],
            }
        },
        {
            id: 12,
            name: 'Bakmil',
            line_id: 1,
            move: [11, 25],
            graph: {11: times.value.short, 25: times.value.shortTransfer},
            view: {
                point: {
                    x: 468,
                    y: 218
                },
                text: {
                    x: 430,
                    y: 212
                },
                render: 'line1_12',
            }
        },
        {
            id: 13,
            name: 'Ulduz',
            line_id: 1,
            move: [14, 11, 26],
            graph: {14: times.value.short, 11: times.value.short, 26: times.value.shortTransfer},
            view: {
                point: {
                    x: 519,
                    y: 210
                },
                text: {
                    x: 532,
                    y: 228
                },
                render: 'line1_13',
            }
        },
        {
            id: 14,
            name: 'Koroğlu',
            line_id: 1,
            move: [15, 13, 27],
            graph: {15: times.value.short, 13: times.value.short, 27: times.value.shortTransfer},
            view: {
                point: {
                    x: 570,
                    y: 179
                },
                text: {
                    x: 552,
                    y: 168
                },
                render: 'line1_14',
            }
        },
        {
            id: 15,
            name: 'Qara Qarayev',
            line_id: 1,
            move: [16, 14, 28],
            graph: {16: times.value.short, 14: times.value.short, 28: times.value.shortTransfer},
            view: {
                point: {
                    x: 637,
                    y: 225
                },
                text: {
                    x: 646,
                    y: 221
                },
                render: 'line1_15',
            }
        },
        {
            id: 16,
            name: 'Neftçilər',
            line_id: 1,
            move: [17, 15, 29],
            graph: {17: times.value.short, 15: times.value.short, 29: times.value.shortTransfer},
            view: {
                point: {
                    x: 670,
                    y: 258
                },
                text: {
                    x: 679,
                    y: 254
                },
                render: 'line1_16',
            }
        },
        {
            id: 17,
            name: 'Xalqlar Dostluğu',
            line_id: 1,
            move: [18, 16, 30],
            graph: {18: times.value.short, 16: times.value.short, 30: times.value.shortTransfer},
            view: {
                point: {
                    x: 698,
                    y: 286
                },
                text: {
                    x: 707,
                    y: 282
                },
                render: 'line1_17',
            }
        },
        {
            id: 18,
            name: 'Əhmədli',
            line_id: 1,
            move: [19, 17, 31],
            graph: {19: times.value.short, 17: times.value.short, 31: times.value.shortTransfer},
            view: {
                point: {
                    x: 727,
                    y: 315
                },
                text: {
                    x: 736,
                    y: 311
                },
                render: 'line1_18',
            }
        },
        {
            id: 19,
            name: 'Həzi Aslanov',
            line_id: 1,
            move: [18, 32],
            graph: {18: times.value.short, 32: times.value.shortTransfer},
            view: {
                point: {
                    x: 756,
                    y: 344
                },
                text: {
                    x: 763,
                    y: 341
                },
                render: 'line1_19',
            }
        },

        // Qırmızı xətt
        {
            id: 20,
            name: 'İçərişəhər',
            line_id: 2,
            move: [21],
            graph: {21: times.value.short},
            view: {
                point: {
                    x: 186,
                    y: 557
                },
                text: {
                    x: 191,
                    y: 571
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
                    x: 248,
                    y: 495
                },
                text: {
                    x: 253,
                    y: 509
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
                    x: 327,
                    y: 415
                },
                text: {
                    x: 281,
                    y: 396
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
            view: {
                point: {
                    x: 403,
                    y: 339
                },
                text: {
                    x: 409,
                    y: 351
                },
                render: 'line2_23',
            }
        },
        {
            id: 24,
            name: 'Nariman Narimanov',
            line_id: 2,
            move: [25, 26, 23, 11],
            graph: {25: times.value.short, 26: times.value.short, 23: times.value.short, 11: times.value.shortTransfer},
            transfer: [ 11 ],
            view: {
                point: {
                    x: 464,
                    y: 278
                },
                text: {
                    x: 470,
                    y: 290
                },
                render: 'line2_24',
                transfer: ['line1_11']
            }
        },
        {
            id: 25,
            name: 'Bakmil',
            line_id: 2,
            move: [24, 12],
            graph: {24: times.value.short, 12: times.value.shortTransfer},
            view: {
                point: {
                    x: 478,
                    y: 218
                },
                text: {
                    x: 430,
                    y: 212
                },
                render: 'line2_25',
            }
        },
        {
            id: 26,
            name: 'Ulduz',
            line_id: 2,
            move: [27, 24, 13],
            graph: {27: times.value.short, 24: times.value.short, 13: times.value.shortTransfer},
            view: {
                point: {
                    x: 525,
                    y: 216
                },
                text: {
                    x: 532,
                    y: 228
                },
                render: 'line2_26',
            }
        },
        {
            id: 27,
            name: 'Koroğlu',
            line_id: 2,
            move: [28, 26, 14],
            graph: {28: times.value.short, 26: times.value.short, 14: times.value.shortTransfer},
            view: {
                point: {
                    x: 570,
                    y: 188
                },
                text: {
                    x: 552,
                    y: 168
                },
                render: 'line2_27',
            }
        },
        {
            id: 28,
            name: 'Qara Qarayev',
            line_id: 2,
            move: [29, 27, 15],
            graph: {29: times.value.short, 27: times.value.short, 15: times.value.shortTransfer},
            view: {
                point: {
                    x: 630,
                    y: 231
                },
                text: {
                    x: 646,
                    y: 221
                },
                render: 'line2_28',
            }
        },
        {
            id: 29,
            name: 'Neftçilər',
            line_id: 2,
            move: [30, 28, 16],
            graph: {30: times.value.short, 28: times.value.short, 16: times.value.shortTransfer},
            view: {
                point: {
                    x: 663,
                    y: 264
                },
                text: {
                    x: 679,
                    y: 254
                },
                render: 'line2_29',
            }
        },
        {
            id: 30,
            name: 'Xalqlar Dostluğu',
            line_id: 2,
            move: [31, 29, 17],
            graph: {31: times.value.short, 29: times.value.short, 17: times.value.shortTransfer},
            view: {
                point: {
                    x: 691,
                    y: 292
                },
                text: {
                    x: 707,
                    y: 282
                },
                render: 'line2_30',
            }
        },
        {
            id: 31,
            name: 'Əhmədli',
            line_id: 2,
            move: [32, 30, 18],
            graph: {32: times.value.short, 30: times.value.short, 18: times.value.shortTransfer},
            view: {
                point: {
                    x: 720,
                    y: 321
                },
                text: {
                    x: 736,
                    y: 311
                },
                render: 'line2_31',
            }
        },
        {
            id: 32,
            name: 'Həzi Aslanov',
            line_id: 2,
            move: [31, 19],
            graph: {31: times.value.short, 19: times.value.shortTransfer},
            view: {
                point: {
                    x: 749,
                    y: 350
                },
                text: {
                    x: 763,
                    y: 341
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
                    x: 441,
                    y: 428
                },
                text: {
                    x: 446,
                    y: 442
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
                    x: 342,
                    y: 428
                },
                text: {
                    x: 347,
                    y: 418
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
                    x: 64,
                    y: 174
                },
                text: {
                    x: 74,
                    y: 171
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
                    x: 117,
                    y: 227
                },
                text: {
                    x: 142,
                    y: 225
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
                    x: 178,
                    y: 288
                },
                text: {
                    x: 187,
                    y: 285
                },
                render: 'line3_37',
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