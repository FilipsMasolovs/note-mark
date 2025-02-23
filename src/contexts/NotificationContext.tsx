'use client'

import React, { createContext, useContext, useState } from 'react'
import { Toast } from '@/components/common/Toast'

interface Notification {
	id: string
	message: string
	type: 'success' | 'error' | 'info'
}

interface NotificationContextType {
	showNotification: (message: string, type?: 'success' | 'error' | 'info') => void
}

const NotificationContext = createContext<NotificationContextType>({
	showNotification: () => {},
})

export const useNotification = () => useContext(NotificationContext)

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [notifications, setNotifications] = useState<Notification[]>([])

	const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
		const id = Date.now().toString()
		setNotifications((prev) => [...prev, { id, message, type }])
	}

	const removeNotification = (id: string) => {
		setNotifications((prev) => prev.filter((notification) => notification.id !== id))
	}

	return (
		<NotificationContext.Provider value={{ showNotification }}>
			{children}
			{notifications.map((notification) => (
				<Toast key={notification.id} message={notification.message} type={notification.type} onClose={() => removeNotification(notification.id)} />
			))}
		</NotificationContext.Provider>
	)
}
