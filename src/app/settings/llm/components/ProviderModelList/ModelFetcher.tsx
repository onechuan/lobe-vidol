import { Icon, Tooltip } from '@lobehub/ui';
import { Typography } from 'antd';
import { createStyles } from 'antd-style';
import dayjs from 'dayjs';
import { LucideLoaderCircle, LucideRefreshCcwDot } from 'lucide-react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { useSettingStore } from '@/store/setting';
import {
  configSelectors,
  modelConfigSelectors,
  modelProviderSelectors,
} from '@/store/setting/selectors';
import { GlobalLLMProviderKey } from '@/types/provider';

const useStyles = createStyles(({ css, token }) => ({
  hover: css`
    cursor: pointer;

    padding-block: 4px;
    padding-inline: 8px;

    border-radius: ${token.borderRadius}px;

    transition: all 0.2s ease-in-out;

    &:hover {
      color: ${token.colorText};
      background-color: ${token.colorFillSecondary};
    }
  `,
}));

interface ModelFetcherProps {
  provider: GlobalLLMProviderKey;
}

const ModelFetcher = memo<ModelFetcherProps>(({ provider }) => {
  const { styles } = useStyles();
  const { t } = useTranslation('settings');
  const [useFetchProviderModelList] = useSettingStore((s) => [
    s.useFetchProviderModelList,
    s.setModelProviderConfig,
  ]);
  const enabledAutoFetch = useSettingStore(modelConfigSelectors.isAutoFetchModelsEnabled(provider));
  const latestFetchTime = useSettingStore(
    (s) => configSelectors.getProviderConfigById(provider)(s)?.latestFetchTime,
  );
  const totalModels = useSettingStore(
    (s) => modelProviderSelectors.getModelCardsById(provider)(s).length,
  );

  const { mutate, isValidating } = useFetchProviderModelList(provider, enabledAutoFetch);

  return (
    <Typography.Text style={{ fontSize: 12 }} type={'secondary'}>
      <Flexbox align={'center'} gap={0} horizontal justify={'space-between'}>
        <div>{t('llm.modelList.total', { count: totalModels })}</div>
        <Tooltip
          overlayStyle={{ pointerEvents: 'none' }}
          title={
            latestFetchTime
              ? t('llm.fetcher.latestTime', {
                  time: dayjs(latestFetchTime).format('YYYY-MM-DD HH:mm:ss'),
                })
              : t('llm.fetcher.noLatestTime')
          }
        >
          <Flexbox
            align={'center'}
            className={styles.hover}
            gap={4}
            horizontal
            onClick={() => mutate()}
          >
            <Icon
              icon={isValidating ? LucideLoaderCircle : LucideRefreshCcwDot}
              size={'small'}
              spin={isValidating}
            />
            <div>{isValidating ? t('llm.fetcher.fetching') : t('llm.fetcher.fetch')}</div>
          </Flexbox>
        </Tooltip>
      </Flexbox>
    </Typography.Text>
  );
});
export default ModelFetcher;
