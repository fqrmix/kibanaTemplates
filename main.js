(() => {  
	const templates  = [
	    {
			id: 0,
			name: 'Error',
			body: 'BodyError'
		},
		{
			id: 1,
			name: 'Причина в Кассе',
			body: 'Payload: &quot;uniLabel&quot; && Payload: (&quot;warn&quot; &quot;error&quot; &quot;auth check unsuccessful&quot; &quot;restrictionid&quot;) \
			&& NOT Payload: (&quot;error=null&quot; &quot;errors=null&quot; &quot;error=optional&quot; &quot;error=optional.empty&quot; \
			&quot;skip loyalty-gate request&quot; &quot;rollbackpayment&quot;)',
			module: 'backend-kassa-main'
		},
		
		{
			id: 2,
			name: 'Ответ в шопах',
			body: 'Payload: &quot;TraceID&quot; && Payload: (&quot;create-order-refused&quot; &quot;payment approval error&quot;)',
			module: 'backend-shop-main'
		},
		
		{
			id: 3,
			name: 'Поиск платежа без попытки',
			body: 'Payload: &quot;Кошелек&quot; && Payload: &quot;CreateShopOrderRequest&quot;',
			module: 'backend-kassa-main'
		},
		
		{
			id: 4,
			name: 'HTTP-уведомление',
			body: 'test4',
			module: 'backend-notifier-main'
		},	
		
		{
			id: 5,
			name: 'Поиск займа на карту юзера через наш лайт',
			body: 'Payload: &quot;XXXXX YYYY&quot; && Payload: (&quot;CreateOrderCommand&quot; &quot;nst_unilabel=&quot; &quot;payerAccount&quot;)',
			module: 'backend-deposit-main'
		},	
	]

        const templateSelectBlock = document.createElement('div')
        templateSelectBlock.classList.add = 'template-select-block'

        const templateSelector = document.createElement('select')
        templateSelector.innerHTML = '<option selected disabled>Выбери шаблон</option>' + templates.filter(x => x.id !== 0)
          .map(template => `<option value="${template.body}">${template.name}</option>`).join('')
        const closeSelectorButton = document.createElement('button')
        closeSelectorButton.innerText = '❌'
        closeSelectorButton.title = 'Закрыть'

        templateSelectBlock.style = 'display: flex; z-index: 9999999999999; position: fixed; top: 10px; width: 20%; margin: 20px; margin-left: 40%; border: 2px solid #8b3ffd; background-color: #fff; padding: 20px; color: white;'
        templateSelector.style = 'border: 1px solid #8b3ffd; border-radius: 5px 0px 0px 5px; width: 80%; border-right: none; height: 3rem;'
        closeSelectorButton.style = 'width: 19%; border: 1px solid #8b3ffd; border-radius: 0px 5px 5px 0px; border-left: none; cursor: pointer;'

        templateSelector.addEventListener('change', event => {
          const templateText = new DOMParser().parseFromString(event.target.value.replaceAll('<br />', '\n'), "text/html").documentElement.textContent;
		  const templateModule = /* нужно сюда передать модуль активного элемента */
          navigator.clipboard.writeText(templateText)
          alert('Текст шаблона скопирован в буфер обмена. Модуль: ' + templateModule)
        })
        closeSelectorButton.addEventListener('click', () => templateSelectBlock.remove())

        templateSelectBlock.appendChild(templateSelector)
        templateSelectBlock.appendChild(closeSelectorButton)
        document.body.appendChild(templateSelectBlock)
})()
