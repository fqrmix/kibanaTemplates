    const templates  = [
		{
			id: 1,
			name: 'Причина в Кассе',
			body: 'test1'
		},
		
		{
			id: 2,
			name: 'Ответ в шопах',
			body: 'test2'
		},
		
		{
			id: 3,
			name: 'Поиск платежа без попытки',
			body: 'test3'
		},
		
		{
			id: 4,
			name: 'HTTP-уведомление',
			body: 'test4'
		},	
	]

        const templateSelectBlock = document.createElement('div')
        templateSelectBlock.classList.add = 'template-select-block'

        const templateSelector = document.createElement('select')
        templateSelector.innerHTML = '<option selected disabled>Выбери шаблон</option>' + templates.filter(x => x.id !== 6723)
          .map(template => `<option value="${template.body}">${template.name}</option>`).join('')
        const closeSelectorButton = document.createElement('button')
        closeSelectorButton.innerText = '❌'
        closeSelectorButton.title = 'Закрыть'

        templateSelectBlock.style = 'display: flex; z-index: 9999999999999; position: fixed; top: 10px; width: 20%; margin: 20px; margin-left: 40%; border: 2px solid #8b3ffd; background-color: #fff; padding: 20px; color: white;'
        templateSelector.style = 'border: 1px solid #8b3ffd; border-radius: 5px 0px 0px 5px; width: 80%; border-right: none; height: 3rem;'
        closeSelectorButton.style = 'width: 19%; border: 1px solid #8b3ffd; border-radius: 0px 5px 5px 0px; border-left: none; cursor: pointer;'

        templateSelector.addEventListener('change', event => {
          const templateText = new DOMParser().parseFromString(event.target.value.replaceAll('<br />', '\n'), "text/html").documentElement.textContent;
          navigator.clipboard.writeText(templateText)
          alert('Текст шаблона скопирован в буфер обмена.')
        })
        closeSelectorButton.addEventListener('click', () => templateSelectBlock.remove())

        templateSelectBlock.appendChild(templateSelector)
        templateSelectBlock.appendChild(closeSelectorButton)
        document.body.appendChild(templateSelectBlock)
