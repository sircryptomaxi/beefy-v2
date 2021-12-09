import React, { memo, useMemo } from 'react';
import { Button, Grid, makeStyles, Typography, useMediaQuery } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AssetsImage } from '../../../../components/AssetsImage';
import { SafetyScore } from '../../../../components/SafetyScore';
import { DisplayTags } from '../../../../components/vaultTags';
import { Popover } from '../../../../components/Popover';
import BigNumber from 'bignumber.js';
import { isEmpty } from '../../../../helpers/utils';
import { byDecimals, formatUsd } from '../../../../helpers/format';
import { styles } from './styles';
import clsx from 'clsx';
import { ApyStats } from '../ApyStats';
import { ApyStatLoader } from '../../../../components/ApyStatLoader';
import { useHideBalanceCtx } from '../../../../components/HideBalancesContext';

const useStyles = makeStyles(styles as any);
const _Item = ({ vault }) => {
  const item = vault;

  const isBoosted = vault.isBoosted;
  const boostedData = vault.boostData;
  const vaultBoosts = vault.boosts;
  const isGovVault = item.isGovVault;
  const isTwoColumns = useMediaQuery('(min-width: 600px) and (max-width: 960px)');

  const { hideBalance } = useHideBalanceCtx();

  const { t } = useTranslation();
  const { wallet, balance } = useSelector((state: any) => ({
    wallet: state.walletReducer,
    balance: state.balanceReducer,
  }));
  const pricesReducer = useSelector((state: any) => state.pricesReducer);
  const [deposited, setDeposited] = React.useState({
    balance: new BigNumber(0),
    shares: new BigNumber(0),
  });
  const [poolRewards, setPoolRewards] = React.useState({
    balance: new BigNumber(0),
    shares: new BigNumber(0),
  });
  const [userStaked, setUserStaked] = React.useState(false);
  const formattedTVL = useMemo(() => formatUsd(item.tvl.toNumber()), [item.tvl]);

  const blurred = deposited.balance.isGreaterThan(0) && hideBalance;

  const styleProps = {
    marginStats: isTwoColumns && !isGovVault && !isBoosted,
    removeMarginButton: isGovVault && poolRewards.balance.isGreaterThan(0),
  };
  const classes = useStyles(styleProps as any);

  React.useEffect(() => {
    let symbol = item.isGovVault ? `${item.token}GovVault` : item.earnedToken;

    let balanceSingle = new BigNumber(0);
    let rewardsBalance = new BigNumber(0);
    let sharesBalance = new BigNumber(0);
    let rewardsSharesBalance = new BigNumber(0);

    if (wallet.address && !isEmpty(balance.tokens[item.network][symbol])) {
      if (item.isGovVault) {
        balanceSingle = byDecimals(
          balance.tokens[item.network][symbol].balance,
          item.tokenDecimals
        );
        rewardsBalance = byDecimals(
          new BigNumber(balance.tokens[item.network][symbol].rewards),
          item.tokenDecimals
        );
        sharesBalance = new BigNumber(balance.tokens[item.network][symbol].balance);
        rewardsSharesBalance = byDecimals(
          new BigNumber(balance.tokens[item.network][symbol].rewards)
        );
      } else {
        balanceSingle = byDecimals(
          new BigNumber(balance.tokens[item.network][item.earnedToken].balance)
            .multipliedBy(byDecimals(item.pricePerFullShare))
            .toFixed(8),
          item.tokenDecimals
        );
        sharesBalance = new BigNumber(balance.tokens[item.network][symbol].balance);
      }
      if (item.isBoosted) {
        const boost = item.boostData;
        let symbol = `${boost.token}${boost.id}Boost`;
        if (!isEmpty(balance.tokens[item.network][symbol])) {
          balanceSingle = byDecimals(
            new BigNumber(balance.tokens[item.network][symbol].balance).multipliedBy(
              byDecimals(item.pricePerFullShare)
            ),
            item.tokenDecimals
          );
          sharesBalance = new BigNumber(balance.tokens[item.network][symbol].balance);
          if (balanceSingle.isGreaterThan(0)) {
            setUserStaked(true);
          }
        }
      }
    }
    setDeposited({ balance: balanceSingle, shares: sharesBalance });
    setPoolRewards({ balance: rewardsBalance, shares: rewardsSharesBalance });
  }, [wallet.address, item, balance, vaultBoosts]);

  const ValueText = ({ value, blurred = false }) => (
    <>
      {value ? (
        <span
          className={clsx({
            [classes.value]: true,
            [classes.blurred]: blurred,
          })}
        >
          {blurred ? '$100' : value}
        </span>
      ) : (
        <ApyStatLoader />
      )}
    </>
  );

  const ValuePrice = ({ value, blurred = false }) => (
    <>
      {value ? (
        <span
          className={clsx({
            [classes.price]: true,
            [classes.blurred]: blurred,
          })}
        >
          {blurred ? '$100' : value}
        </span>
      ) : (
        <ApyStatLoader />
      )}
    </>
  );

  const _deposited = deposited.balance.isGreaterThan(0)
    ? deposited.balance.toFixed(8)
    : new BigNumber(0).toFixed(0);

  const depositedUsd = deposited.balance.isGreaterThan(0)
    ? formatUsd(deposited.balance, pricesReducer.prices[item.oracleId])
    : formatUsd(0);

  const rewardsEarned = poolRewards.balance.isGreaterThan(0)
    ? poolRewards.shares
    : new BigNumber(0);

  const rewardPrice = poolRewards.balance.isGreaterThan(0)
    ? formatUsd(poolRewards.balance, pricesReducer.prices[item.earnedToken])
    : formatUsd(0);

  const formatDecimals = number => {
    return number.isGreaterThanOrEqualTo(0)
      ? number.toFixed(4)
      : number.isEqualTo(0)
      ? 0
      : number.toFixed(8);
  };

  return (
    <div
      className={clsx({
        [classes.itemContainer]: true,
        [classes.withHasDeposit]: item.balance > 0,
        [classes.withMuted]: item.status === 'paused' || item.status === 'eol',
        [classes.withIsLongName]: item.name.length > 12,
        [classes.withBoosted]: isBoosted,
        [classes.withGovVault]: isGovVault,
      })}
    >
      <Grid container className={classes.dataGrid}>
        {/*Title*/}
        <div className={classes.titleContainer}>
          <Grid container>
            <Grid
              item
              className={classes.infoContainer}
              style={{ marginRight: '8px', cursor: 'pointer' }}
            >
              <Link className={classes.removeLinkStyles} to={`/${item.network}/vault/${item.id}`}>
                {/*Vault Image*/}
                <AssetsImage
                  img={item.logo}
                  assets={item.assets}
                  alt={item.name}
                  {...({ size: '60px' } as any)}
                />
              </Link>
            </Grid>
            <Grid item>
              <Link className={classes.removeLinkStyles} to={`/${item.network}/vault/${item.id}`}>
                {isGovVault ? (
                  <Typography className={classes.govVaultTitle}>EARN {item.earnedToken}</Typography>
                ) : null}
                <div className={classes.infoContainer}>
                  {/*Vault Name*/}
                  <Typography className={classes.vaultName}>{item.name}</Typography>
                </div>
                <div className={classes.badgesContainter}>
                  <div className={classes.badges}>
                    {/*Network Image*/}
                    <img
                      alt={item.network}
                      src={require(`../../../../images/networks/${item.network}.svg`).default}
                      width={24}
                      height={24}
                      style={{ width: '24px', height: '24px' }}
                    />
                    {/*Vault Tags*/}
                    <DisplayTags isBoosted={isBoosted} tags={item.tags} />
                  </div>
                </div>
              </Link>
              <span className={classes.platformContainer}>
                <Typography className={classes.platformLabel}>{t('PLATFORM')}:&nbsp;</Typography>
                <Typography className={classes.platformValue}>{item.platform}</Typography>
              </span>
            </Grid>
          </Grid>
        </div>
        <div className={classes.statsContainer}>
          <Grid container>
            {/*BOOSTED BY*/}
            {/* {isBoosted && parseInt(priceInDolar.balance) === 0 && ( */}
            {isBoosted && userStaked && (
              <div className={classes.centerSpace}>
                <div className={classes.stat}>
                  <Typography className={classes.label}>{t('STAKED-IN')}</Typography>
                  <ValueText value={boostedData.name} />
                  <Typography className={classes.label}>
                    <ValuePrice value={t('BOOST')} />
                  </Typography>
                </div>
              </div>
            )}
            {/*DEPOSIT*/}
            {(!isBoosted || !userStaked) && (
              <div className={classes.centerSpace}>
                <div className={classes.stat}>
                  <Typography className={classes.label}>{t('DEPOSITED')}</Typography>

                  <ValueText blurred={blurred} value={_deposited} />

                  {deposited.balance.isGreaterThan(0) && (
                    <Typography className={classes.label}>
                      <ValuePrice blurred={blurred} value={depositedUsd} />
                    </Typography>
                  )}
                  {/* {parseInt(priceInDolar.balance) > 0 ? (
                    <div className={classes.boostSpacer} />
                  ) : null} */}
                </div>
              </div>
            )}
            {/*TVL*/}
            <div className={classes.centerSpace}>
              <div className={classes.stat}>
                <Typography className={classes.label}>{t('TVL')}</Typography>
                <Typography className={classes.value}>{formattedTVL}</Typography>
                {isTwoColumns || isBoosted || deposited.balance.isGreaterThan(0) ? (
                  <div className={classes.boostSpacer} />
                ) : null}
              </div>
            </div>
            {/*APY STATS*/}
            <ApyStats
              {...({
                isBoosted: isBoosted,
                launchpoolApr: boostedData,
                apy: item.apy,
                spacer: isTwoColumns || (!isBoosted && deposited.balance.isGreaterThan(0)),
                isGovVault: item.isGovVault ?? false,
              } as any)}
            />
            {/*Rewards/Safety Score*/}
            {isGovVault ? (
              <div className={classes.centerSpace}>
                <div className={classes.stat}>
                  <Typography className={classes.label}>{t('Vault-Rewards')}</Typography>

                  <ValueText
                    blurred={blurred}
                    value={(formatDecimals(rewardsEarned) ?? '') + ` ${item.earnedToken}`}
                  />
                  {deposited.balance.isGreaterThan(0) && (
                    <Typography className={classes.label}>
                      <ValuePrice blurred={blurred} value={rewardPrice} />
                    </Typography>
                  )}
                  {isTwoColumns ? <div className={classes.boostSpacer} /> : null}
                </div>
              </div>
            ) : (
              <div className={classes.centerSpace}>
                <div className={classes.stat}>
                  <div className={classes.tooltipLabel}>
                    <Typography className={classes.safetyLabel}>{t('Safety-Score')}</Typography>
                    <div className={classes.tooltipHolder}>
                      <Popover
                        {...({
                          title: t('Safety-ScoreWhat'),
                          content: t('Safety-ScoreExpl'),
                        } as any)}
                      />
                    </div>
                  </div>
                  <SafetyScore score={item.safetyScore} whiteLabel size="sm" />
                  {isTwoColumns || isBoosted || deposited.balance.isGreaterThan(0) ? (
                    <div className={classes.boostSpacer} />
                  ) : null}
                </div>
              </div>
            )}
            {/*Open Vault*/}
            <div className={classes.centerSpaceOpen} style={{ padding: 0 }}>
              <Link className={classes.removeLinkStyles} to={`/${item.network}/vault/${item.id}`}>
                <Button size="large" className={classes.depositButton}>
                  {isGovVault ? t('Vault-Open-Pool') : t('Vault-Open')}
                </Button>
              </Link>
            </div>
          </Grid>
        </div>
      </Grid>
    </div>
  );
};

export const Item = memo(_Item);
