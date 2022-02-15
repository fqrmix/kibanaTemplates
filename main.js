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
			body: 'Payload: "uniLabel" && Payload: ("warn" "error" "auth check unsuccessful" "restrictionid") \
			&& NOT Payload: ("error=null" "errors=null" "error=optional" "error=optional.empty" \
			"skip loyalty-gate request" "rollbackpayment")',
			module: 'backend-kassa-main'
		},
		
		{
			id: 2,
			name: 'Ответ в шопах',
			body: 'Payload: "TraceID" && Payload: ("create-order-refused" "payment approval error")',
			module: 'backend-shop-main'
		},
		
		{
			id: 3,
			name: 'Поиск платежа без попытки',
			body: 'Payload: "Кошелек" && Payload: "CreateShopOrderRequest"',
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
			body: 'Payload: "XXXXX YYYY" && Payload: ("CreateOrderCommand" "nst_unilabel=" "payerAccount")',
			module: 'backend-deposit-main'
		},	
	]

        const templateSelectBlock = document.createElement('div')
        templateSelectBlock.classList.add('template-select-block');

		const templateSelector = document.createElement('select');

		const options = templates.map(template => {
			const opt = document.createElement('option');

			opt.data = template;
			opt.value = template.id;
			opt.innerText = template.id !== 0
			  ? template.name
			  :'Выбери шаблон';

			if (template.id === 0) {
			  opt.selected = true;
			  opt.disabled = true;
			}

			return opt;
		});

		options.map(opt => templateSelector.appendChild(opt));
		  
		const closeSelectorButton = document.createElement('button')
        closeSelectorButton.innerText = '❌'
        closeSelectorButton.title = 'Закрыть'

        templateSelectBlock.style = 'display: flex; z-index: 9999999999999; position: fixed; top: 10px; width: 20%; margin: 20px; margin-left: 40%; border: 2px solid #8b3ffd; background-color: #fff; padding: 20px; color: white;'
        templateSelector.style = 'border: 1px solid #8b3ffd; border-radius: 5px 0px 0px 5px; width: 80%; border-right: none; height: 3rem;'
        closeSelectorButton.style = 'width: 19%; border: 1px solid #8b3ffd; border-radius: 0px 5px 5px 0px; border-left: none; cursor: pointer;'

		templateSelector.addEventListener('change', event => {
			const data = templates.find(tmp => tmp.id === +event.target.value);
			navigator.clipboard.writeText(data.body);
			alert('Текст шаблона скопирован в буфер обмена. Модуль: ' + data.module);
		  });
		  
        closeSelectorButton.addEventListener('click', () => templateSelectBlock.remove())

        templateSelectBlock.appendChild(templateSelector)
        templateSelectBlock.appendChild(closeSelectorButton)
        document.body.appendChild(templateSelectBlock)
})()
