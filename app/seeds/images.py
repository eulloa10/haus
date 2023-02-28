from app.models import db, Image, environment, SCHEMA

def seed_images():
    image_0 = Image(
      listing_id=1,
      user_id=1,
      img_url='https://haus-listing-images.s3.amazonaws.com/202c20f179d14d84bfe80f0ab07c9ec2.jpg')
    image_1 = Image(
      listing_id=1,
      user_id=1,
      img_url='https://haus-listing-images.s3.amazonaws.com/1ea7621ca99546c29f45d6b731ef9829.jpeg')
    image_2 = Image(
      listing_id=1,
      user_id=1,
      img_url='https://haus-listing-images.s3.amazonaws.com/5fcefdb5d8634b5499e282fd353499c4.jpeg')
    image_3 = Image(
      listing_id=1,
      user_id=1,
      img_url='https://haus-listing-images.s3.amazonaws.com/163680bb68e248d780b0dedfd1160026.jpeg')
    image_4 = Image(
      listing_id=2,
      user_id=2,
      img_url='https://haus-listing-images.s3.amazonaws.com/6943cab86737483d99a5bf7dc7c3d49e.jpeg')
    image_5 = Image(
      listing_id=2,
      user_id=2,
      img_url='https://haus-listing-images.s3.amazonaws.com/5a387ceea365445b96096cb06f81aef1.jpeg')
    image_6 = Image(
      listing_id=2,
      user_id=2,
      img_url='https://haus-listing-images.s3.amazonaws.com/2bf293f88b1444e88b54b06121bff91a.jpeg')
    image_7 = Image(
      listing_id=3,
      user_id=3,
      img_url='https://haus-listing-images.s3.amazonaws.com/c6cde06300f547c7a973092f8f9736f9.jpeg')
    image_8 = Image(
      listing_id=3,
      user_id=3,
      img_url='https://haus-listing-images.s3.amazonaws.com/369ea4ecfbde45149574d6e6a91690f8.jpeg')
    image_9 = Image(
      listing_id=3,
      user_id=3,
      img_url='https://haus-listing-images.s3.amazonaws.com/05004d467c6349e782e400f7f063aa13.jpeg')
    image_10 = Image(
      listing_id=4,
      user_id=4,
      img_url='https://haus-listing-images.s3.amazonaws.com/954badd1afe54127a02c59b798b23953.jpeg')
    image_11 = Image(
      listing_id=4,
      user_id=4,
      img_url='https://haus-listing-images.s3.amazonaws.com/8a460f24ba1742aeb742186e25143c12.jpeg')
    image_12 = Image(
      listing_id=4,
      user_id=4,
      img_url='https://haus-listing-images.s3.amazonaws.com/4cfdc83d0e0f4be9bc5120a089a12b04.jpeg')
    image_13 = Image(
      listing_id=5,
      user_id=5,
      img_url='https://haus-listing-images.s3.amazonaws.com/c88a58227f8f4ad1812d303348d21061.jpeg')
    image_14 = Image(
      listing_id=5,
      user_id=5,
      img_url='https://haus-listing-images.s3.amazonaws.com/c268c11fc1b14b84a0487234e799f6bc.jpeg')
    image_15 = Image(
      listing_id=5,
      user_id=5,
      img_url='https://haus-listing-images.s3.amazonaws.com/a5db271817844fc8b7ac36c2b66eec30.jpeg')
    image_16 = Image(
      listing_id=6,
      user_id=6,
      img_url='https://haus-listing-images.s3.amazonaws.com/ad406726bf314fd794f5f5b5de5cd87d.jpeg')
    image_17 = Image(
      listing_id=6,
      user_id=6,
      img_url='https://haus-listing-images.s3.amazonaws.com/9ca913be57f44b2aace38ad48665a451.jpeg')
    image_18 = Image(
      listing_id=6,
      user_id=6,
      img_url='https://haus-listing-images.s3.amazonaws.com/c41307d73b394956b405d80efe9470b6.jpeg')
    image_19 = Image(
      listing_id=6,
      user_id=6,
      img_url='https://haus-listing-images.s3.amazonaws.com/f255bfaf9a3a47b88e3bd6474545b281.jpeg')


    db.session.add(image_0)
    db.session.add(image_1)
    db.session.add(image_2)
    db.session.add(image_3)
    db.session.add(image_4)
    db.session.add(image_5)
    db.session.add(image_6)
    db.session.add(image_7)
    db.session.add(image_8)
    db.session.add(image_9)
    db.session.add(image_10)
    db.session.add(image_11)
    db.session.add(image_12)
    db.session.add(image_13)
    db.session.add(image_14)
    db.session.add(image_15)
    db.session.add(image_16)
    db.session.add(image_17)
    db.session.add(image_18)
    db.session.add(image_19)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM images")

    db.session.commit()
