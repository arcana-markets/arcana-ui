import { useEffect, useState } from 'react'
import { IconCheck, IconInfoCircle, IconCircleXFilled, IconX } from '@tabler/icons-react';
import useNotificationStore from '@/stores/useNotificationStore'
import { useConnection } from '@solana/wallet-adapter-react';
import { useNetworkConfiguration } from '@/contexts/NetworkConfigurationProvider';

interface NotificationStore {
  type: 'success' | 'info' | 'error';
  message: string;
  description?: string;
  txid?: string;
  onHide: () => void;
}

const NotificationList = () => {
  const { notifications, set: setNotificationStore } = useNotificationStore(
    (s) => s
  )

  const reversedNotifications = [...notifications].reverse()

  return (
    <div
      className={`z-20 fixed inset-20 flex items-end px-4 py-6 pointer-events-none sm:p-6`}
    >
      <div className={`flex flex-col w-full`}>
      {reversedNotifications.map((n, idx) => (
          <Notification
            key={`${n.message}${idx}`}
            type={n.type as 'success' | 'info' | 'error'}
            message={n.message}
            description={n.description}
            txid={n.txid}
            onHide={() => {
              setNotificationStore((state: any) => {
                const reversedIndex = reversedNotifications.length - 1 - idx;
                state.notifications = [
                  ...notifications.slice(0, reversedIndex),
                  ...notifications.slice(reversedIndex + 1),
                ];
              });
            }}
          />
        ))}
      </div>
    </div>
  );
}

const Notification: React.FC<NotificationStore> = ({ type, message, description, txid, onHide }) => {
  const { networkConfiguration } = useNetworkConfiguration(); // Assuming this hook returns an object with a network property
  const { connection } = useConnection();

  useEffect(() => {
    const id = setTimeout(() => {
      onHide();
    }, 8000);

    return () => {
      clearTimeout(id);
    };
  }, [onHide]);

  return (
    <div
    className={`w-full max-w-md rounded-md mt-2 pointer-events-auto  mx-4 mb-12 overflow text-foxflowerviola bg-[#013746] sm:bg-[#252B32] sm:max-w-3/4 md:max-w-1/2 lg:max-w-1/3 xl:max-w-1/4 transition-all duration-300 ease-linear Connect_btn`}
  >
    <div className={`p-4 rounded-md bg-gradient-to-r from-purple-900 from-10% via-purple-600 via-30% to-emerald-500 to-90%`}>
      <div className={`flex flex-grow items-center`}>
        <div className={`flex-shrink-0`}>
            {type === 'success' ? (
              <IconCheck className={`h-8 w-8 mr-1 text-green`} />
            ) : null}
            {type === 'info' && <IconInfoCircle className={`h-8 w-8 mr-1 text-red`} />}
            {type === 'error' && (
              <IconCircleXFilled className={`h-8 w-8 mr-1`} />
            )}
          </div>
          <div className={`flex-grow ml-2`}>
            <div className={`font-bold text-foxflowerviola`}>{message}</div>
            {description ? (
              <p className={`mt-0.5 text-sm text-fgd-2`}>{description}</p>
            ) : null}
            {txid ? (
              <div className="flex flex-row">
         
                <a
                  href={'https://explorer.solana.com/tx/' + txid + `?cluster=${networkConfiguration}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-row link link-accent text-emerald-200"
                >
                  <svg className="flex-shrink-0 h-4 ml-2 mt-0.5 text-primary-light w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" ><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                  <div className="flex mx-4">{txid.slice(0, 8)}...
                    {txid.slice(txid.length - 8)}
                  </div>
                </a>
              </div>
            ) : null}
          </div>
          <div className={`ml-4 flex-shrink-0 self-start flex`}>
            <button
              onClick={() => onHide()}
              className={`bg-bkg-2 default-transition rounded-md inline-flex text-primary hover:text-foxflowerviola focus:outline-none`}
            >
              <span className={`sr-only`}>Close</span>
              <IconX className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationList;