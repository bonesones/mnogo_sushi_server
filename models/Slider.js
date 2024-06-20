import { Slider as SliderMapping } from './mapping.js'
import FileService from '../services/File.js'

class Slider {
    async getAll() {
        const sliders = await SliderMapping.findAll({
            order: [['id', 'DESC']]
        })
        return sliders
    }

    async getOne(id) {
        const slider = await SliderMapping.findByPk(id)
        if (!slider) {
            throw new Error('Слайд не найден')
        }
        return slider
    }

    async create(data, images) {
        const sliderExists = await SliderMapping.findOne({
            where: {
                title: data.title,
            }
        })

        if(sliderExists) {
            throw new Error('Слайд с таким названием уже существует')
        }
        const desktop_image = FileService.save(images.desktop_image)
        const tablet_phone_image = FileService.save(images.tablet_phone_image);
        const { title } = data
        const slider = await SliderMapping.create({ desktop_image, tablet_phone_image, title })
        return slider;
    }

    async update(id, data, images) {
        const slider = await SliderMapping.findByPk(id)
        if (!slider) {
            throw new Error('Слайд не найден')
        }
        const sliderExists = await SliderMapping.findOne({
            where: {
                title: data.title,
            }
        })

        if(sliderExists && data.title != slider.title) {
            throw new Error('Слайд с таким названием уже существует')
        }

        const new_desktop_image = FileService.save(images?.desktop_image)
        const new_tablet_phone_image = FileService.save(images?.tablet_phone_image)

        if(new_desktop_image && slider.desktop_image) {
            FileService.delete(slider.desktop_image)
        }

        if(new_tablet_phone_image && slider.tablet_phone_image) {
            FileService.delete(slider.tablet_phone_image)
        }

        await slider.update({
            desktop_image: new_desktop_image ? new_desktop_image : slider.desktop_image,
            tablet_phone_image: new_tablet_phone_image ? new_tablet_phone_image : slider.tablet_phone_image,
            title: data.title ? data.title : slider.title
        })

        return slider
    }

    async delete(id) {
        const slider = await SliderMapping.findByPk(id)
        if (!slider) {
            throw new Error('Вопрос не найден')
        }
        await slider.destroy()
        return slider
    }
}

export default new Slider()