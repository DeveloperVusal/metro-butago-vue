import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStationsStore = defineStore('stations', () => {
    const lines = ref([])
    const stations = ref([])
    const colors = ref({})

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
            view: {
                point: {
                    x: 368,
                    y: 178
                },
                text: {
                    x: 246,
                    y: 168
                },
            }
        },
        {
            id: 2,
            name: 'Azadlıq prospekti',
            line_id: 1,
            view: {
                point: {
                    x: 287,
                    y: 178
                },
                text: {
                    x: 246,
                    y: 168
                },
            }
        },
        {
            id: 3,
            name: 'Nəsimi',
            line_id: 1,
            view: {
                point: {
                    x: 192,
                    y: 178
                },
                text: {
                    x: 176,
                    y: 168
                },
            }
        },
        {
            id: 4,
            name: 'Memar Əcəmi',
            line_id: 1,
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
            }
        },
        {
            id: 5,
            name: '20 Yanvar',
            line_id: 1,
            view: {
                point: {
                    x: 131,
                    y: 288
                },
                text: {
                    x: 76,
                    y: 291
                },
            }
        },
        {
            id: 6,
            name: 'İnşaatçılar',
            line_id: 1,
            view: {
                point: {
                    x: 131,
                    y: 339
                },
                text: {
                    x: 74,
                    y: 342
                },
            }
        },
        {
            id: 7,
            name: 'Elmlər Akademiyası',
            line_id: 1,
            view: {
                point: {
                    x: 136,
                    y: 402
                },
                text: {
                    x: 31,
                    y: 404
                },
            }
        },
        {
            id: 8,
            name: 'Nizami',
            line_id: 1,
            view: {
                point: {
                    x: 208,
                    y: 422
                },
                text: {
                    x: 191,
                    y: 439
                },
            }
        },
        {
            id: 9,
            name: '28 May',
            line_id: 1,
            transfer: [ 34, 22 ],
            view: {
                point: {
                    x: 320,
                    y: 409
                },
                text: {
                    x: 281,
                    y: 396
                },
            }
        },
        {
            id: 10,
            name: 'Gənclik',
            line_id: 1,
            view: {
                point: {
                    x: 396,
                    y: 333
                },
                text: {
                    x: 409,
                    y: 351
                },
            }
        },
        {
            id: 11,
            name: 'Nariman Narimanov',
            line_id: 1,
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
            }
        },
        {
            id: 12,
            name: 'Bakmil',
            line_id: 1,
            view: {
                point: {
                    x: 468,
                    y: 218
                },
                text: {
                    x: 430,
                    y: 212
                },
            }
        },
        {
            id: 13,
            name: 'Ulduz',
            line_id: 1,
            view: {
                point: {
                    x: 519,
                    y: 210
                },
                text: {
                    x: 532,
                    y: 228
                },
            }
        },
        {
            id: 14,
            name: 'Koroğlu',
            line_id: 1,
            view: {
                point: {
                    x: 570,
                    y: 179
                },
                text: {
                    x: 552,
                    y: 168
                },
            }
        },
        {
            id: 15,
            name: 'Qara Qarayev',
            line_id: 1,
            view: {
                point: {
                    x: 637,
                    y: 225
                },
                text: {
                    x: 646,
                    y: 221
                },
            }
        },
        {
            id: 16,
            name: 'Neftçilər',
            line_id: 1,
            view: {
                point: {
                    x: 670,
                    y: 258
                },
                text: {
                    x: 679,
                    y: 254
                },
            }
        },
        {
            id: 17,
            name: 'Xalqlar Dostluğu',
            line_id: 1,
            view: {
                point: {
                    x: 698,
                    y: 286
                },
                text: {
                    x: 707,
                    y: 282
                },
            }
        },
        {
            id: 18,
            name: 'Əhmədli',
            line_id: 1,
            view: {
                point: {
                    x: 727,
                    y: 315
                },
                text: {
                    x: 736,
                    y: 311
                },
            }
        },
        {
            id: 19,
            name: 'Həzi Aslanov',
            line_id: 1,
            view: {
                point: {
                    x: 756,
                    y: 344
                },
                text: {
                    x: 763,
                    y: 341
                },
            }
        },

        // Qırmızı xətt
        {
            id: 20,
            name: 'İçərişəhər',
            line_id: 2,
            view: {
                point: {
                    x: 186,
                    y: 557
                },
                text: {
                    x: 191,
                    y: 571
                },
            }
        },
        {
            id: 21,
            name: 'Sahil',
            line_id: 2,
            view: {
                point: {
                    x: 248,
                    y: 495
                },
                text: {
                    x: 253,
                    y: 509
                },
            }
        },
        {
            id: 22,
            name: '28 May',
            line_id: 2,
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
            }
        },
        {
            id: 23,
            name: 'Gənclik',
            line_id: 2,
            view: {
                point: {
                    x: 403,
                    y: 339
                },
                text: {
                    x: 409,
                    y: 351
                },
            }
        },
        {
            id: 24,
            name: 'Nariman Narimanov',
            line_id: 2,
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
            }
        },
        {
            id: 25,
            name: 'Bakmil',
            line_id: 2,
            view: {
                point: {
                    x: 478,
                    y: 218
                },
                text: {
                    x: 430,
                    y: 212
                },
            }
        },
        {
            id: 26,
            name: 'Ulduz',
            line_id: 2,
            view: {
                point: {
                    x: 525,
                    y: 216
                },
                text: {
                    x: 532,
                    y: 228
                },
            }
        },
        {
            id: 27,
            name: 'Koroğlu',
            line_id: 2,
            view: {
                point: {
                    x: 570,
                    y: 188
                },
                text: {
                    x: 552,
                    y: 168
                },
            }
        },
        {
            id: 28,
            name: 'Qara Qarayev',
            line_id: 2,
            view: {
                point: {
                    x: 630,
                    y: 231
                },
                text: {
                    x: 646,
                    y: 221
                },
            }
        },
        {
            id: 29,
            name: 'Neftçilər',
            line_id: 2,
            view: {
                point: {
                    x: 663,
                    y: 264
                },
                text: {
                    x: 679,
                    y: 254
                },
            }
        },
        {
            id: 30,
            name: 'Xalqlar Dostluğu',
            line_id: 2,
            view: {
                point: {
                    x: 691,
                    y: 292
                },
                text: {
                    x: 707,
                    y: 282
                },
            }
        },
        {
            id: 31,
            name: 'Əhmədli',
            line_id: 2,
            view: {
                point: {
                    x: 720,
                    y: 321
                },
                text: {
                    x: 736,
                    y: 311
                },
            }
        },
        {
            id: 32,
            name: 'Həzi Aslanov',
            line_id: 2,
            view: {
                point: {
                    x: 749,
                    y: 350
                },
                text: {
                    x: 763,
                    y: 341
                },
            }
        },

        // Yaşıl xətt (məkik hərəkət)
        {
            id: 33,
            name: 'Şah İsmayıl Xətai',
            line_id: 4,
            view: {
                point: {
                    x: 441,
                    y: 428
                },
                text: {
                    x: 446,
                    y: 442
                },
            }
        },
        {
            id: 34,
            name: 'Cəfər Cabbarlı',
            line_id: 4,
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
            }
        },

        // Bənövşəyi xətt
        {
            id: 35,
            name: 'Avtovağzal',
            line_id: 3,
            view: {
                point: {
                    x: 64,
                    y: 174
                },
                text: {
                    x: 74,
                    y: 171
                },
            }
        },
        {
            id: 36,
            name: 'Memar Əcəmi',
            line_id: 3,
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
            }
        },
        {
            id: 37,
            name: '8 Noyabr',
            line_id: 3,
            view: {
                point: {
                    x: 178,
                    y: 288
                },
                text: {
                    x: 187,
                    y: 285
                },
            }
        },
    ]

    return { lines, colors, stations }
})