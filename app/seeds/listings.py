from app.models import db, Listing, environment, SCHEMA


def seed_listings():
    demo_listing = Listing(
        owner_id=1,
        address='9936 Grant Lane',
        city='Depew',
        state='NY',
        zip_code=14043,
        country='US',
        lat=44.887960,
        lng=-73.437500,
        description='Great opportunity to purchase this investment property or be owner occupied! This 2 unit upper/lower offers 2658 Sqft, with double wide driveway, 1.5 car attached garage, located on a quiet neighborhood street in the village of Depew.  Maintenance free exterior with updated vinyl windows, High efficiency furnace, covered front porch and backyard patio.  This property has been owned by the same family since built! Committed to guiding you HOME!',
        type='Apartment',
        beds=4,
        baths=2,
        sqft=2658,
        price=115000,
        preview_image='https://photos.zillowstatic.com/fp/c2b5f0a73961a2cbee05254d09e291e5-cc_ft_576.webp'
    )
    demo_listing_1 = Listing(
        owner_id=2,
        address='7606 Harwood Ct',
        city='Maineville',
        state='OH',
        zip_code=45039,
        country='US',
        lat=39.323120,
        lng=-84.194090,
        description='This open floor home features an enormous living area, ideal for a centralized hosting space. Upstairs, the primary bedroom has a trayed ceilings, and an en suite with a freestanding soaker tub. The remaining three bedrooms feature plenty of closet space and lots of natural light. Also, a coveted second floor laundry area with counter space. Downstairs, the unfinished basement is full of potential with an area already roughed-in for a bathroom and plenty of storage.',
        type='House',
        beds=4,
        baths=3,
        sqft=2623,
        price=390000,
        preview_image='https://photos.zillowstatic.com/fp/5059099ee158293f08f9185d8623f2d1-cc_ft_1536.webp'
    )
    demo_listing_2 = Listing(
        owner_id=3,
        address='6412 Genevieve Trl',
        city='Cottage Grove',
        state='MN',
        zip_code=55016,
        country='US',
        lat=44.786640,
        lng=-92.891870,
        description='High Pointe in Cottage Grove offers new construction 3  bedroom townhomes. The townhomes feature an open floor plan on the main level, granite kitchen countertops, stainless appliances, optional fireplace, and a patio. The upper level features 3 bedrooms, an office, and the laundry room. The luxury bedroom suite includes a spacious bath, walk-in closet, and sliding glass doors that lead to a private deck! Ellis White Designer Package. Enjoy our private dog park and many walking trails!',
        type='Townhome',
        beds=3,
        baths=3,
        sqft=1894,
        price=404750,
        preview_image='https://photos.zillowstatic.com/fp/7f16982c0469937df190864d6748269b-uncropped_scaled_within_1536_1152.webp')
    demo_listing_3 = Listing(
        owner_id=4,
        address='594 S Mapleton Dr',
        city='Los Angeles',
        state='CA',
        zip_code=90024,
        country='US',
        lat=34.073330,
        lng=-118.428291,
        description='"The Manor" An unparalleled offering, an unrivaled setting, a showplace of the highest caliber. The Manor is undoubtedly one of the finest estates in the World. Majestically sited on 4.68 acres in the heart of Holmby Hills, The Manor offers complete privacy bordering the Los Angeles Country Club. Entirely clad in limestone and comprised of over 56,000sqft, The Manor offers every amenity imaginable. From bowling alleys to beauty salons, rolling lawns to rose gardens, a legendary library to professional screening room: the options are vast and endless. A rare opportunity to acquire one of the most important estates ever created.',
        type='House',
        beds=14,
        baths=27,
        sqft=56500,
        price=165000000,
        preview_image='https://photos.zillowstatic.com/fp/04f9bf2cdb30329a5a3675f2c54e4bf1-cc_ft_1536.webp'
    )
    demo_listing_4 = Listing(
        owner_id=5,
        address='316 6th Ave',
        city='Venice',
        state='CA',
        zip_code=90291,
        country='US',
        lat=33.998660,
        lng=-118.471340,
        description="Prime location, this spacious walk up in the heart of Venice is just steps away from Rose, Abbot Kinney, and most importantly 6 blocks from the BEACH! The newly updated townhouse features 3 bedrooms and 3 bathrooms (2,393 sq ft)  plus bonus quarters ( 550 sq ft) with a 3/4 bath.  The main floor opens to a perfect entertainer's kitchen outfitted with Bosch appliances and porcelain countertops with a waterfall island. The open floor plan includes dining and a large living space filled with tons of natural light, high ceilings and a great ocean breeze.  All 3 bedrooms are located on the 3rd floor with ample closet space and 2 large full bathrooms. The side-by-side washer/dryer is conveniently located in the upstairs hallway closet.  A fantastic rooftop deck with 360 degree views is great for entertaining and watching beautiful sunsets.  Plenty of off street parking with a spacious 2-car garage and a large driveway for additional 3 car parking. Don't miss this one!",
        type='Condo',
        beds=4,
        baths=4,
        sqft=2943,
        price=2499000,
        preview_image='https://photos.zillowstatic.com/fp/66a2b1458ec09dd8bd45b7093023aa65-cc_ft_768.webp'
    )
    demo_listing_5 = Listing(
        owner_id=6,
        address='8888 Appian Way',
        city='Los Angeles',
        state='CA',
        zip_code=90046,
        country='US',
        lat=34.106590,
        lng=-118.383320,
        description="Romantic, Emotional, Vintage convey estate's 1930s storybook cottage pedigree. Compound presides at the pinnacle of the Sunset Strip & offers breathtaking views of Downtown Los Angeles & Pacific Ocean. Main House includes 3BRs/2BAs w/ add'l 1BR/1BA guest apt & detached 2sty 1BR/1BA casita w/kitchen  Total sq ft is over 3,000. All offer separate entrances, a perfect setup for add'l income. Rugged posts & beams, peg & groove floor, antique doors from a European hotel, stately fireplace & floor to ceiling windows create impressive entertaining spaces. Newly renovated kitchen w/ built-in breakfast area seating. Lounge in an oversized primary steam shower while gazing at the ocean or find quiet contemplation in the estate's vaulted reading tower. 2 private entertaining patios & a 2-car garage complete this eclectic paradise. Located in award winning Wonderland Elementary & near prominent Hollywood locales: Soho Club, The Whiskey, Saddle Ranch, Comedy Store, The Edition, & Sunset Tower.",
        type='House',
        beds=5,
        baths=4,
        sqft=3158,
        price=2195000,
        preview_image='https://photos.zillowstatic.com/fp/a512dfd2d806d2e33055d754c63e8128-cc_ft_768.webp'
    )

    db.session.add(demo_listing)
    db.session.add(demo_listing_1)
    db.session.add(demo_listing_2)
    db.session.add(demo_listing_3)
    db.session.add(demo_listing_4)
    db.session.add(demo_listing_5)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_listings():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.listings RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM listings")

    db.session.commit()
