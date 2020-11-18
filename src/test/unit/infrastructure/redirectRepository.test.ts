import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';

import { IRedirect, Redirect } from '../../../core';
import RedirectRepository from '../../../infrastructure/redirectRepository';
import container from '../../../ioc';

chai.use(chaiAsPromised);

describe('RedirectRepository', () => {
  const repo = container.get(RedirectRepository);
  beforeEach(async () => {
    await Redirect.destroy({ where: {} });
    await Redirect.bulkCreate([
      { target: 'https://google.com', alias: 'google' },
      { target: 'https://bing.com', alias: 'bing' },
      { target: 'https://stackoverflow.com', alias: 'stack' },
    ]);
  });

  it('should get existing redirect', async () => {
    const res = await repo.get('google');
    expect(res!.target).to.equal('https://google.com');
    expect(res!.alias).to.equal('google');
  });

  it('should return null for non-existing redirect', async () => {
    const res = await repo.get('foo');
    expect(res).to.equal(null);
  });

  it('should create valid URL with alias', async () => {
    const newRedirect: IRedirect = { alias: 'youtube', target: 'https://youtube.com' };
    const res = await repo.create(newRedirect);
    expect(res.target).to.equal('https://youtube.com');
    expect(res.alias).to.equal('youtube');
  });

  it('should create valid URL with random alias', async () => {
    const newRedirect: IRedirect = { target: 'https://youtube.com' };
    const res = await repo.create(newRedirect);
    expect(res.target).to.equal('https://youtube.com');
    // Regex breakdown: 1st group matches alphanumericals
    // The ?: signifies a non-capturing group. The group consists of
    // a dash followed by more alphanumericals. This prevents double-dashes
    // or strings ending in dashes from being valid
    // source: https://stackoverflow.com/questions/6616562/regular-expression-that-accepts-alphanumeric-non-consecutive-dash-and-non-cons
    expect(res.alias).to.match(/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/);
  });

  it('should reject invalid aliases', async () => {
    const newRedirect: IRedirect = { target: 'http://www.pokemon.com', alias: 'pikachu-' };
    const anotherRedirect: IRedirect = { target: 'http://www.mario.com', alias: "it's-a-me-mario" };
    const yetAnotherRedirect: IRedirect = {
      target: 'http://www.marilland.com',
      alias: 'marill--marill',
    };
    const oneLastRedirect: IRedirect = { target: 'http://foobar', alias: 'foobar' };

    await expect(repo.create(newRedirect)).to.eventually.be.rejectedWith(Error);
    await expect(repo.create(anotherRedirect)).to.eventually.be.rejectedWith(Error);
    await expect(repo.create(yetAnotherRedirect)).to.eventually.be.rejectedWith(Error);
    await expect(repo.create(oneLastRedirect)).to.eventually.be.rejectedWith(Error);
  });

  it('should reject taken aliases', async () => {
    const newRedirect: IRedirect = { target: 'http://facebook.com', alias: 'bing' };
    await expect(repo.create(newRedirect)).to.eventually.be.rejectedWith(Error);
  });

  it('should create redirects in bulk', async () => {
    const newRedirects: IRedirect[] = [
      { target: 'http://facebook.com', alias: 'facebook' },
      { target: 'https://myspace.com', alias: 'my-space' },
      { target: 'https://msn.com', alias: 'msn' },
    ];
    await expect(repo.bulkCreate(newRedirects)).to.eventually.be.fulfilled;
    await expect(repo.get('facebook')).to.eventually.have.property('target', 'http://facebook.com');
  });

  it('should validate bulk creations', async () => {
    const newRedirects: IRedirect[] = [
      { target: 'www.facebook.com', alias: 'facebook' },
      { target: 'http://myspace.com', alias: 'my-space' },
      { target: 'www.tetris.com', alias: 'tetris' },
    ];
    await expect(repo.bulkCreate(newRedirects)).to.be.rejectedWith(Error);
  });
});
