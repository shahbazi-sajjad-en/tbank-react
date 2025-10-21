// ** Icon Imports
import Icon from '@core/components/icon'

// ** Third Party Import
import { useTranslation } from 'react-i18next'

// ** Custom Components Imports
import OptionsMenu from '@core/components/option-menu'

// ** Type Import
import { Settings } from '@core/context/settingsContext'

interface Props {
  settings: Settings
  saveSettings: (values: Settings) => void
}

const LanguageDropdown = ({ settings, saveSettings }: Props) => {
  // ** Hook
  const { i18n } = useTranslation()

  const handleLangItemClick = (lang: 'en' | 'fa') => {
    i18n.changeLanguage(lang)
  }

  return (
    <OptionsMenu
      iconButtonProps={{ color: 'inherit' }}
      icon={<Icon fontSize='1.5rem' icon='tabler:language' />}
      menuProps={{ sx: { '& .MuiMenu-paper': { mt: 4.5, minWidth: 130 } } }}
      options={[
        {
          text: 'انگلیسی',
          menuItemProps: {
            sx: { py: 2 },
            selected: i18n.language === 'en',
            onClick: () => {
              handleLangItemClick('en')
              saveSettings({ ...settings, direction: 'ltr' })
            }
          }
        },
        {
          text: 'فارسی',
          menuItemProps: {
            sx: { py: 2 },
            selected: i18n.language === 'fa',
            onClick: () => {
              handleLangItemClick('fa')
              saveSettings({ ...settings, direction: 'rtl' })
            }
          }
        },
        // {
        //   text: 'French',
        //   menuItemProps: {
        //     sx: { py: 2 },
        //     selected: i18n.language === 'fr',
        //     onClick: () => {
        //       handleLangItemClick('fr')
        //       saveSettings({ ...settings, direction: 'ltr' })
        //     }
        //   }
        // },
        // {
        //   text: 'Arabic',
        //   menuItemProps: {
        //     sx: { py: 2 },
        //     selected: i18n.language === 'ar',
        //     onClick: () => {
        //       handleLangItemClick('ar')
        //       saveSettings({ ...settings, direction: 'rtl' })
        //     }
        //   }
        // }
      ]}
    />
  )
}

export default LanguageDropdown
