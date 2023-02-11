import images from '~/assets/images'

export const listImages = [
    {
        image: [
            { id: 'img05_075336', src: images.img05_075336 },
            { id: 'img05_075408', src: images.img05_075408 },
            { id: 'img05_075440', src: images.img05_075440 },
        ],
    },
    {
        image: [
            { id: 'img05_075941', src: images.img05_075941 },
            { id: 'img05_082810', src: images.img05_082810 },
            { id: 'img05_083402', src: images.img05_083402 },
        ],
    },
    {
        image: [
            { id: 'img05_091011', src: images.img05_091011 },
            { id: 'img05_094120', src: images.img05_094120 },
            { id: 'img05_102720', src: images.img05_102720 },
        ],
    },
    {
        image: [{ id: 'img05_102752', src: images.img05_102752 }, { id: 'img05_102824', src: images.img05_102824 }, ''],
    },
    {
        image: [
            { id: 'img06_075312', src: images.img06_075312 },
            { id: 'img06_075344', src: images.img06_075344 },
            { id: 'img06_075416', src: images.img06_075416 },
        ],
    },
    {
        image: [
            { id: 'img06_075624', src: images.img06_075624 },
            { id: 'img06_075800', src: images.img06_075800 },
            { id: 'img06_080112', src: images.img06_080112 },
        ],
    },
    {
        image: [
            { id: 'img06_081653', src: images.img06_081653 },
            { id: 'img06_084523', src: images.img06_084523 },
            { id: 'img06_084555', src: images.img06_084555 },
        ],
    },
    {
        image: [
            { id: 'img06_084803', src: images.img06_084803 },
            { id: 'img06_085011', src: images.img06_085011 },
            { id: 'img06_085043', src: images.img06_085043 },
        ],
    },
]

export const fakeRequest = async () => {
    return new Promise((resolve, reject) => {
        const wait = setTimeout(() => {
            clearTimeout(wait)
            resolve({ data: listImages })
        }, 2000)
    })
}
