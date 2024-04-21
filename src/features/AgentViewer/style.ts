import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
  toolbar: css`
    position: absolute;
    right: ${token.paddingMD}px;
    bottom: 50%;
    display: flex;
  `,
  dialog: css`
    position: absolute;
    top: ${token.paddingMD}px;
    left: ${token.paddingMD}px;
    display: flex;
  `,
  viewer: css`
    position: relative;
    width: 100%;
    height: 100%;
  `,
}));
